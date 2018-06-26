package com.lndr.react.modules.paypal;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

// NativeModule docs:
// https://facebook.github.io/react-native/docs/native-modules-android.html

// PayPal Android SDK:
// https://github.com/paypal/PayPal-Android-SDK

// TODO: move these outta here
private static String PAYPAL_CLIENT_ID_PROD = @"AXOXl_tY00hi203wiplGZSDfP1T0W463wnDqfd4jFh3yG1ABkbPrrNCex1F8YXEROmqcVnSzVNTF80D2";
private static String PAYPAL_CLIENT_ID_SANDBOX = @"AQabZLoBTVKngs5UNiUWKk4CCjzh8EvPGoqz07nzzWPjYsVypvPRN9vVafll8Op-r3CKMHoBeygbf0pW";

public class PayPalModule extends ReactContextBaseJavaModule {
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


        _payPalConfiguration.acceptCreditCards = NO;
  }

  @ReactMethod
  public void connectPayPal(Promise promise) {
    // as described here:
    // https://github.com/paypal/PayPal-Android-SDK/blob/master/docs/profile_sharing_mobile.md
    this.promise = promise;
    Intent intent = new Intent(SampleActivity.this, PayPalProfileSharingActivity.class);
    // send the same configuration for restart resiliency
    intent.putExtra(PayPalService.EXTRA_PAYPAL_CONFIGURATION, config);
    intent.putExtra(PayPalProfileSharingActivity.EXTRA_REQUESTED_SCOPES, getOauthScopes());
    startActivityForResult(intent, REQUEST_CODE_PROFILE_SHARING);
  }

  private PayPalOAuthScopes getOauthScopes() {
      Set<String> scopes = new HashSet<String>(
              Arrays.asList(PayPalOAuthScopes.PAYPAL_SCOPE_EMAIL) );
      return new PayPalOAuthScopes(scopes);
  }

  @Override
  protected void onActivityResult (int requestCode, int resultCode, Intent data) {
      if (resultCode == Activity.RESULT_OK) {
          PayPalAuthorization auth = data.getParcelableExtra(PayPalProfileSharingActivity.EXTRA_RESULT_AUTHORIZATION);
          if (auth != null) {
              try {
                  String authorization_code = auth.getAuthorizationCode();
// TODO: send this back as the Promise

                  // sendAuthorizationToServer(auth);

              } catch (JSONException e) {
                this.promise.reject("Unknown error", e);
                this.promise = null;
              }
          }
      } else if (resultCode == Activity.RESULT_CANCELED) {
          this.promise.reject(Activity.RESULT_CANCELED, new Error("User canceled"))
      } else if (resultCode == PayPalProfileSharingActivity.RESULT_EXTRAS_INVALID) {
        this.promise.reject(PayPalProfileSharingActivity.RESULT_EXTRAS_INVALID, new Error("Can't start PayPal service"))
      }
  }

  @ReactMethod
  public void sendPayPalPayment(String amount, String currencyCode, String payeeEmail, String description, Promise promise) {
    // TODO: open PayPal's Android SendPaymentView and capture confirmation
  }

}
