package com.lndr.react.modules.paypal;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.paypal.android.sdk.payments.PayPalAuthorization;
import com.paypal.android.sdk.payments.PayPalConfiguration;
import com.paypal.android.sdk.payments.PayPalOAuthScopes;
import com.paypal.android.sdk.payments.PayPalProfileSharingActivity;
import com.paypal.android.sdk.payments.PayPalService;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

// NativeModule docs:
// https://facebook.github.io/react-native/docs/native-modules-android.html

// PayPal Android SDK:
// https://github.com/paypal/PayPal-Android-SDK
// http://paypal.github.io/PayPal-Android-SDK/

public class PayPalModule extends ReactContextBaseJavaModule {
  // TODO: move these outta here
  private final static String PAYPAL_CLIENT_ID_PROD = "AXOXl_tY00hi203wiplGZSDfP1T0W463wnDqfd4jFh3yG1ABkbPrrNCex1F8YXEROmqcVnSzVNTF80D2";
  private final static String PAYPAL_CLIENT_ID_SANDBOX = "AQabZLoBTVKngs5UNiUWKk4CCjzh8EvPGoqz07nzzWPjYsVypvPRN9vVafll8Op-r3CKMHoBeygbf0pW";

  private PayPalConfiguration config;
  private Promise promise;

  public PayPalModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }
  @Override
  public String getName() {
    return "PayPalModule";
  }

  @ReactMethod
  public void initPayPal() {
    // Start with mock environment.  When ready, switch to sandbox (ENVIRONMENT_SANDBOX)
		// or live (ENVIRONMENT_PRODUCTION)
    this.config = new PayPalConfiguration()
        .environment(PayPalConfiguration.ENVIRONMENT_NO_NETWORK)
        .clientId(PAYPAL_CLIENT_ID_SANDBOX)
        // Minimally, you will need to set three merchant information properties.
		    // These should be the same values that you provided to PayPal when you registered your app.
        .merchantName("Blockmason")
        .merchantPrivacyPolicyUri(Uri.parse("https://blockmason.io/privacy"))
        .merchantUserAgreementUri(Uri.parse("https://blockmason.io/agreement"));
// TODO: turn off credit cards
//        _payPalConfiguration.acceptCreditCards = NO;
  }

/* move into an Activity:
  Start PayPalService when your activity is created and stop it upon destruction:
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      Intent intent = new Intent(this, PayPalService.class);

      intent.putExtra(PayPalService.EXTRA_PAYPAL_CONFIGURATION, config);

      startService(intent);
  }

  @Override
  public void onDestroy() {
      stopService(new Intent(this, PayPalService.class));
      super.onDestroy();
  }
*/
  @ReactMethod
  public void connectPayPal(Promise promise) {
// TODO: not finished, this needs to be inside an activity
    // https://github.com/paypal/PayPal-Android-SDK/blob/master/docs/profile_sharing_mobile.md
    this.promise = promise;
    Intent intent = new Intent(null/*SampleActivity.this*/, PayPalProfileSharingActivity.class);
    // send the same configuration for restart resiliency
    intent.putExtra(PayPalService.EXTRA_PAYPAL_CONFIGURATION, config);
    intent.putExtra(PayPalProfileSharingActivity.EXTRA_REQUESTED_SCOPES, getOauthScopes());
// PUT THIS BACK IN:    
// startActivityForResult(intent, REQUEST_CODE_PROFILE_SHARING);
  }

  private PayPalOAuthScopes getOauthScopes() {
      Set<String> scopes = new HashSet<String>(
              Arrays.asList(PayPalOAuthScopes.PAYPAL_SCOPE_EMAIL) );
      return new PayPalOAuthScopes(scopes);
  }

// TODO: again, move into the Activity
//  @Override
  protected void onActivityResult (int requestCode, int resultCode, Intent data) {
      if (resultCode == Activity.RESULT_OK) {
          PayPalAuthorization auth = data.getParcelableExtra(PayPalProfileSharingActivity.EXTRA_RESULT_AUTHORIZATION);
          if (auth != null) {
              try {
                  String authorization_code = auth.getAuthorizationCode();
                  // send this back in the Promise
                  this.promise.resolve(authorization_code);
                  this.promise = null;

              } catch (Exception e) {
                this.promise.reject("Unknown error", e);
                this.promise = null;
              }
          }
      } else if (resultCode == Activity.RESULT_CANCELED) {
          this.promise.reject("User canceled", new Exception("User canceled"));
      } else if (resultCode == PayPalProfileSharingActivity.RESULT_EXTRAS_INVALID) {
        this.promise.reject("No PayPal Service", new Exception("Can't start PayPal service"));
      }
  }

  @ReactMethod
  public void sendPayPalPayment(String amount, String currencyCode, String payeeEmail, String description, Promise promise) {
    // TODO: open PayPal's Android SendPaymentView and capture confirmation, similar to above
  }

}
