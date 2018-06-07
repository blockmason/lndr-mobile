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

const NSString *PAYPAL_CLIENT_ID_PROD = @"PAYPAL PRODUCTION CLIENTID GOES HERE";
const NSString *PAYPAL_CLIENT_ID_DEV = @"ARxpac3GundniEtoXRHvLK6PqZjm-yBmNTsLTFKuHLEfrOM6cRv81_XeRvO1sFYkXThgJurZbOk24G_G";

@interface PayPalManager ()
@property (nonatomic, strong, readwrite) PayPalConfiguration *payPalConfiguration;
@end

@implementation PayPalManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initPayPal) {
  RCTLogInfo(@"Initializing PayPalManager");
  dispatch_async(dispatch_get_main_queue(), ^{
    // initiate PayPal session
    // Start out working with the mock environment. When you are ready, switch to PayPalEnvironmentProduction.
    [PayPalMobile preconnectWithEnvironment:PayPalEnvironmentNoNetwork];//PayPalEnvironmentSandbox//PayPalEnvironmentProduction];
    
    _payPalConfiguration = [[PayPalConfiguration alloc] init];
    // See PayPalConfiguration.h for details and default values.
    // Minimally, you will need to set three merchant information properties.
    // These should be the same values that you provided to PayPal when you registered your app.
    _payPalConfiguration.merchantName = @"BM";
    _payPalConfiguration.merchantPrivacyPolicyURL = [NSURL URLWithString:@"https://blockmason.io/privacy"];
    _payPalConfiguration.merchantUserAgreementURL = [NSURL URLWithString:@"https://blockmason.io/agreement"];
  });
}

RCT_EXPORT_METHOD(connectPayPal) {
  // obtain user consent for PayPal info
  NSSet *scopeValues = [NSSet setWithArray:@[kPayPalOAuth2ScopeOpenId, kPayPalOAuth2ScopeEmail]];//, kPayPalOAuth2ScopeAddress, kPayPalOAuth2ScopePhone]];
  
  PayPalProfileSharingViewController *psViewController;
  psViewController = [[PayPalProfileSharingViewController alloc] initWithScopeValues:scopeValues configuration:self.payPalConfiguration delegate:self];
  
  dispatch_async(dispatch_get_main_queue(), ^{
    // Present the PayPalProfileSharingViewController
    AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [delegate.window.rootViewController presentViewController:psViewController animated:YES completion:nil];
  });
}

- (void)payPalProfileSharingViewController:(nonnull PayPalProfileSharingViewController *)profileSharingViewController userDidLogInWithAuthorization:(nonnull NSDictionary *)profileSharingAuthorization {
// send the authorization response to your server.
//  [[WorkerService sharedService] savePayPalAuth:profileSharingAuthorization];
//  if (![@"authorization_code" isEqualToString:[paypalAuthD safeStringForKey:@"response_type"]]) {
//    NSLog(@"ERROR: Unexpected PayPal Auth response: %@", [paypalAuthD safeStringForKey:@"response_type"]);
//    return NO;
//  }
//
//  NSDictionary *responseD = [paypalAuthD objectForKey:@"response"];
//  NSString *code = [responseD safeStringForKey:@"code"];
//  if ([code length] == 0) {
//    NSLog(@"ERROR: Unexpected PayPal Auth response");
//    return NO;
//  }
//
//  NSDictionary *paypalD = @{@"uuid": _currentWorker.uuid
//                            ,@"code": code
//                            };
//  NSString *endpoint = [NSString stringWithFormat:@"/ledger/paypal"];
//  [super postEndpoint:endpoint data:paypalD completion:^(NSObject *resultObj, NSError *error) {

  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [delegate.window.rootViewController dismissViewControllerAnimated:YES completion:^{
  }];
}

- (void)userDidCancelPayPalProfileSharingViewController:(nonnull PayPalProfileSharingViewController *)profileSharingViewController {
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [delegate.window.rootViewController dismissViewControllerAnimated:YES completion:^{
    //    [self.navigationController popViewControllerAnimated:NO];
  }];
}

@end
