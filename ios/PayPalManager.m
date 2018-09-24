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

@interface PayPalManager ()
@property (nonatomic, strong, readwrite) PayPalConfiguration *payPalConfiguration;
@property (nonatomic, strong) RCTPromiseResolveBlock resolver;
@property (nonatomic, strong) RCTPromiseRejectBlock rejecter;
@end

@implementation PayPalManager

RCT_EXPORT_MODULE();

+ (void)setup {
  NSString *configPath = [[NSBundle mainBundle] pathForResource:@"PayPalConfig" ofType:@"plist"];
  if (!configPath) {
    NSLog(@"ERROR: missing PayPalConfig");
    return;
  }
  NSDictionary *theDict = [NSDictionary dictionaryWithContentsOfFile:configPath];
  NSString *sandboxId = [theDict objectForKey:@"sandboxId"];
  NSString *prodId = [theDict objectForKey:@"productionId"];
  if ( (!sandboxId) || (!prodId) ) {
    NSLog(@"ERROR: PayPalConfig missing keys");
    return;
  }
  [PayPalMobile initializeWithClientIdsForEnvironments:@{PayPalEnvironmentProduction: prodId
                                                         ,PayPalEnvironmentSandbox: sandboxId}];
}

RCT_EXPORT_METHOD(initPayPal) {
  RCTLogInfo(@"Initializing PayPalManager");
  dispatch_async(dispatch_get_main_queue(), ^{
    // initiate PayPal session
    [PayPalMobile preconnectWithEnvironment:PayPalEnvironmentProduction];//Sandbox];//PayPalEnvironmentNoNetwork

    _payPalConfiguration = [[PayPalConfiguration alloc] init];
    // See PayPalConfiguration.h for details and default values.
    // Minimally, you will need to set three merchant information properties.
    // These should be the same values that you provided to PayPal when you registered your app.
    _payPalConfiguration.merchantName = @"Blockmason";
    _payPalConfiguration.merchantPrivacyPolicyURL = [NSURL URLWithString:@"https://blockmason.io/terms/#privacypolicy"];
    _payPalConfiguration.merchantUserAgreementURL = [NSURL URLWithString:@"https://blockmason.io/paypalagreement.html"];
    _payPalConfiguration.acceptCreditCards = NO;
  });
}

#pragma mark Linking PayPal to a User's account: "connectPayPal"
RCT_REMAP_METHOD(connectPayPal,
                 connectPayPalWithResolver:(RCTPromiseResolveBlock)resolver
                 rejecter:(RCTPromiseRejectBlock)rejecter) {
  // obtain user consent for PayPal info
  NSSet *scopeValues = [NSSet setWithArray:@[kPayPalOAuth2ScopeOpenId, kPayPalOAuth2ScopeEmail]];

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
                 sendPayPalPayment:(nonnull NSNumber *)amount
                 currencyCode:(NSString *)currencyCode
                 payeeEmail:(NSString *)payeeEmail
                 description:(NSString *)description
                 resolver:(RCTPromiseResolveBlock)resolver
                 rejecter:(RCTPromiseRejectBlock)rejecter) {
  if ([amount doubleValue] <= 0.0) {
    if (rejecter)
      rejecter(@"negative_payment", @"Payment amount must be > 0", nil);
    NSLog(@"Payment amount <= 0");
    return;
  }
  if ([currencyCode length] == 0) {
    if (rejecter)
      rejecter(@"missing_currency_code", @"Missing currency code", nil);
    NSLog(@"Missing currency code");
    return;
  }
  if ([payeeEmail length] == 0) {
    if (rejecter)
      rejecter(@"missing_payee", @"Missing payee", nil);
    NSLog(@"Missing payeeEmail");
    return;
  }
  if ([description length] == 0) {
    if (rejecter)
      rejecter(@"missing_description", @"Missing payment description", nil);
    NSLog(@"Missing payment description");
    return;
  }

  // Create a PayPalPayment
  PayPalPayment *payment = [[PayPalPayment alloc] init];
  // iOS experiences precision errors when converting to double
  // we are forced to first convert to a string
  NSNumberFormatter *formatter = [[NSNumberFormatter alloc] init];
  [formatter setNumberStyle:NSNumberFormatterDecimalStyle];
  [formatter setMaximumFractionDigits:2];
  [formatter setRoundingMode: NSNumberFormatterRoundCeiling];//Up];
  NSString *amountS = [formatter stringFromNumber:amount];

  // Amount, currency, and description
  payment.amount = [[NSDecimalNumber alloc] initWithString:amountS];
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
    if (rejecter)
      rejecter(@"paypal_not_processed", @"Unable to process PayPal payment", nil);
    NSLog(@"Unable to process PayPal payment");
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
