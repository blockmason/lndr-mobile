//
//  PayPalManager.m
//  LNDR
//
//  Created by Ethan Arutunian on 6/6/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "PayPalManager.h"
#import "AppDelegate.h"
#import <React/RCTLog.h>

// TODO: move these outta here
const NSString *PAYPAL_CLIENT_ID_PROD = @"AXOXl_tY00hi203wiplGZSDfP1T0W463wnDqfd4jFh3yG1ABkbPrrNCex1F8YXEROmqcVnSzVNTF80D2";
const NSString *PAYPAL_CLIENT_ID_DEV = @"AQabZLoBTVKngs5UNiUWKk4CCjzh8EvPGoqz07nzzWPjYsVypvPRN9vVafll8Op-r3CKMHoBeygbf0pW";

@interface PayPalManager ()
@property (nonatomic, strong, readwrite) PayPalConfiguration *payPalConfiguration;
@property (nonatomic, strong) RCTPromiseResolveBlock resolver;
@property (nonatomic, strong) RCTPromiseRejectBlock rejecter;
@end

@implementation PayPalManager

RCT_EXPORT_MODULE();

+ (void)setup {
  [PayPalMobile initializeWithClientIdsForEnvironments:@{PayPalEnvironmentProduction: PAYPAL_CLIENT_ID_PROD,
                                                         PayPalEnvironmentSandbox: PAYPAL_CLIENT_ID_DEV}];
}

RCT_EXPORT_METHOD(initPayPal) {
  RCTLogInfo(@"Initializing PayPalManager");
  dispatch_async(dispatch_get_main_queue(), ^{
    // initiate PayPal session
    // Start out working with the mock environment. When you are ready, switch to PayPalEnvironmentProduction.
    [PayPalMobile preconnectWithEnvironment:PayPalEnvironmentSandbox];//PayPalEnvironmentNoNetwork//PayPalEnvironmentProduction];//

    _payPalConfiguration = [[PayPalConfiguration alloc] init];
    // See PayPalConfiguration.h for details and default values.
    // Minimally, you will need to set three merchant information properties.
    // These should be the same values that you provided to PayPal when you registered your app.
    _payPalConfiguration.merchantName = @"Blockmason";
    _payPalConfiguration.merchantPrivacyPolicyURL = [NSURL URLWithString:@"https://blockmason.io/privacy"];
    _payPalConfiguration.merchantUserAgreementURL = [NSURL URLWithString:@"https://blockmason.io/agreement"];
    _payPalConfiguration.acceptCreditCards = NO;
  });
}

#pragma mark Linking PayPal to a User's account: "connectPayPal"
RCT_REMAP_METHOD(connectPayPal,
                 connectPayPalWithResolver:(RCTPromiseResolveBlock)resolver
                 rejecter:(RCTPromiseRejectBlock)rejecter) {
  // obtain user consent for PayPal info
  NSSet *scopeValues = [NSSet setWithArray:@[kPayPalOAuth2ScopeOpenId, kPayPalOAuth2ScopeEmail]];//, kPayPalOAuth2ScopeAddress, kPayPalOAuth2ScopePhone]];

  PayPalProfileSharingViewController *psViewController;
  psViewController = [[PayPalProfileSharingViewController alloc] initWithScopeValues:scopeValues configuration:self.payPalConfiguration delegate:self];

  self.resolver = resolver;
  self.rejecter = rejecter;
  
  dispatch_async(dispatch_get_main_queue(), ^{
    // Present the PayPalProfileSharingViewController
    AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [delegate.window.rootViewController presentViewController:psViewController animated:YES completion:nil];
  });
}

- (void)payPalProfileSharingViewController:(nonnull PayPalProfileSharingViewController *)profileSharingViewController userDidLogInWithAuthorization:(nonnull NSDictionary *)profileSharingAuthorization {
  // sample authorization response:
  //    {
  //      client: {
  //        product_name: 'PayPal iOS SDK',
  //        platform: 'iOS',
  //        paypal_sdk_version: '2.18.1',
  //        environment: 'mock'
  //      },
  //      response_type: 'authorization_code',
  //      response: {
  //        code: 'AuthorizationCodeForNoNetworkEnvironment'
  //      }
  //    }

  NSString *authCode = nil;
  NSString *responseType = [profileSharingAuthorization objectForKey:@"response_type"];
  if ([@"authorization_code" isEqualToString:responseType]) {
    NSObject *responseObj = [profileSharingAuthorization objectForKey:@"response"];
    if ( (responseObj) && ([responseObj isKindOfClass:[NSDictionary class]]) )
      authCode = [(NSDictionary *)responseObj objectForKey:@"code"];
  }
  if (self.resolver) {
    self.resolver(authCode);
    self.rejecter = nil;
    self.resolver = nil;
  }

  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [delegate.window.rootViewController dismissViewControllerAnimated:YES completion:^{
  }];
}

- (void)userDidCancelPayPalProfileSharingViewController:(nonnull PayPalProfileSharingViewController *)profileSharingViewController {
  if (self.rejecter) {
    self.rejecter(@"user_cancelled", @"User cancelled", nil);
    self.rejecter = nil;
    self.resolver = nil;
  }

  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [delegate.window.rootViewController dismissViewControllerAnimated:YES completion:^{
    //    [self.navigationController popViewControllerAnimated:NO];
  }];
}

#pragma mark Sending an actual Payment: "sendPayPalPayment"

RCT_REMAP_METHOD(sendPayPalPayment,
                 sendPayPalPayment:(NSString *)amount
                 currencyCode:(NSString *)currencyCode
                 payeeEmail:(NSString *)payeeEmail
                 description:(NSString *)description
                 resolver:(RCTPromiseResolveBlock)resolver
                 rejecter:(RCTPromiseRejectBlock)rejecter) {
  if ([amount doubleValue] <= 0.0) {
    NSLog(@"Payment amount <= 0");
    return;
  }
  if ([currencyCode length] == 0) {
    NSLog(@"Missing currency code");
    return;
  }
  if ([payeeEmail length] == 0) {
    NSLog(@"Missing payeeEmail");
    return;
  }
  if ([description length] == 0) {
    NSLog(@"Missing description");
    return;
  }

  // Create a PayPalPayment
  PayPalPayment *payment = [[PayPalPayment alloc] init];

  // Amount, currency, and description
  payment.amount = [[NSDecimalNumber alloc] initWithDouble:[amount doubleValue]];
  payment.currencyCode = currencyCode;
  payment.shortDescription = description;
  payment.payeeEmail = payeeEmail; // set destination payee

  // Use the intent property to indicate that this is a "sale" payment,
  // meaning combined Authorization + Capture.
  // To perform Authorization only, and defer Capture to your server,
  // use PayPalPaymentIntentAuthorize.
  // To place an Order, and defer both Authorization and Capture to
  // your server, use PayPalPaymentIntentOrder.
  // (PayPalPaymentIntentOrder is valid only for PayPal payments, not credit card payments.)
  payment.intent = PayPalPaymentIntentSale;

  // Check whether payment is processable.
  if (!payment.processable) {
    // If, for example, the amount was negative or the shortDescription was empty, then
    // this payment would not be processable. You would want to handle that here.
    NSLog(@"PayPal payment not processable");
    return;
  }

  self.resolver = resolver;
  self.rejecter = rejecter;
  
  PayPalPaymentViewController *paymentViewController;
  paymentViewController = [[PayPalPaymentViewController alloc] initWithPayment:payment configuration:self.payPalConfiguration delegate:self];
  dispatch_async(dispatch_get_main_queue(), ^{
    // Present the PayPalPaymentViewController.
    AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [delegate.window.rootViewController presentViewController:paymentViewController animated:YES completion:nil];
  });
}

#pragma mark - PayPalPaymentDelegate

- (void)payPalPaymentDidCancel:(nonnull PayPalPaymentViewController *)paymentViewController {
  // User canceled the payment process.
  if (self.rejecter) {
    self.rejecter(@"user_cancelled", @"User cancelled", nil);
    self.rejecter = nil;
    self.resolver = nil;
  }
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [delegate.window.rootViewController dismissViewControllerAnimated:YES completion:^{
    //    [self.navigationController popViewControllerAnimated:NO];
  }];
}

- (void)payPalPaymentViewController:(nonnull PayPalPaymentViewController *)paymentViewController didCompletePayment:(nonnull PayPalPayment *)completedPayment {
  // User successfully completed the payment.
  if (self.resolver) {
    self.resolver(completedPayment.confirmation);
    self.rejecter = nil;
    self.resolver = nil;
  }
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [delegate.window.rootViewController dismissViewControllerAnimated:YES completion:^{
  }];
}

@end
