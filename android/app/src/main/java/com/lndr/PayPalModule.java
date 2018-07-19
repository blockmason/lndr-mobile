package com.lndr.react.modules.paypal;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.net.Uri;
import android.content.Context;
import android.content.res.AssetManager;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.LifecycleEventListener;
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
import com.paypal.android.sdk.payments.PayPalPayment;
import com.paypal.android.sdk.payments.PaymentActivity;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.math.BigDecimal;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

// NativeModule docs:
// https://facebook.github.io/react-native/docs/native-modules-android.html

// PayPal Android SDK:
// https://github.com/paypal/PayPal-Android-SDK
// http://paypal.github.io/PayPal-Android-SDK/

// Inspiration from:
// https://github.com/taessina/react-native-paypal-wrapper/blob/master/android/src/main/java/com/taessina/paypal/RNPaypalWrapperModule.java

public class PayPalModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
  private final ReactApplicationContext reactContext;

  private static final int PAYPAL_REQUEST = 65535;
  private static final int REQUEST_CODE_PAYMENT = 1;
  private static final int REQUEST_CODE_FUTURE_PAYMENT = 2;
  private static final int REQUEST_CODE_PROFILE_SHARING = 3;

  private PayPalConfiguration config;
  private Promise promise;

  public static String getConfigProperty(String key, Context context) {
    String result = "";
    try {
      Properties properties = new Properties();;
      AssetManager assetManager = context.getAssets();
      InputStream inputStream = assetManager.open("paypalconfig.properties");
      properties.load(inputStream);
      result = properties.getProperty(key);
    } catch (IOException e) {
      e.printStackTrace();
    }
    return result;
  }

  private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
    public void onActivityResult (Activity activity, int requestCode, int resultCode, Intent data) {
      if (resultCode == Activity.RESULT_OK) {
        PayPalAuthorization auth = data.getParcelableExtra(PayPalProfileSharingActivity.EXTRA_RESULT_AUTHORIZATION);
        if (auth != null) {
          try {
            String authorization_code = auth.getAuthorizationCode();
            promise.resolve(authorization_code);
          } catch (Exception e) {
            promise.reject("Unknown error", e);
          }
        }
      } else if (resultCode == Activity.RESULT_CANCELED) {
          promise.reject("User canceled", new Exception("User canceled"));
      } else if (resultCode == PayPalProfileSharingActivity.RESULT_EXTRAS_INVALID) {
        promise.reject("No PayPal Service", new Exception("Can't start PayPal service"));
      }
      promise = null;
    }
  };

  public PayPalModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;

    reactContext.addActivityEventListener(mActivityEventListener);
    reactContext.addLifecycleEventListener(this);
  }
  @Override
  public String getName() {
    return "PayPalManager";
  }

  @ReactMethod
  public void initPayPal() {
    // Start with mock environment.  When ready, switch to sandbox (ENVIRONMENT_SANDBOX)
		// or live (ENVIRONMENT_PRODUCTION)
    String PAYPAL_CLIENT_ID_PROD = getConfigProperty("productionId", getCurrentActivity().getApplicationContext());
    String PAYPAL_CLIENT_ID_SANDBOX = getConfigProperty("sandboxId", getCurrentActivity().getApplicationContext());

    this.config = new PayPalConfiguration()
      .environment(PayPalConfiguration.ENVIRONMENT_SANDBOX)
      .clientId(PAYPAL_CLIENT_ID_SANDBOX)
      .merchantName("Blockmason")
      .merchantPrivacyPolicyUri(Uri.parse("https://blockmason.io/privacy"))
      .merchantUserAgreementUri(Uri.parse("https://blockmason.io/agreement"))
      .acceptCreditCards(false);
  }

  @ReactMethod
  public void connectPayPal(Promise promise) {
    this.promise = promise;
    Intent intent = new Intent(reactContext, PayPalProfileSharingActivity.class);
    // send the same configuration for restart resiliency
    intent.putExtra(PayPalService.EXTRA_PAYPAL_CONFIGURATION, config);
    intent.putExtra(PayPalProfileSharingActivity.EXTRA_REQUESTED_SCOPES, getOauthScopes());

    getCurrentActivity().startActivityForResult(intent, REQUEST_CODE_PROFILE_SHARING);
  }

  private PayPalOAuthScopes getOauthScopes() {
    Set<String> scopes = new HashSet<String>(
            Arrays.asList(PayPalOAuthScopes.PAYPAL_SCOPE_EMAIL) );
    return new PayPalOAuthScopes(scopes);
  }

  @ReactMethod
  public void sendPayPalPayment(String amount, String currencyCode, String payeeEmail, String description, Promise promise) {
    // TODO: open PayPal's Android SendPaymentView and capture confirmation, similar to above
    this.promise = promise;

    PayPalPayment payment =
      new PayPalPayment(
        new BigDecimal(amount),
        currencyCode,
        description,
        PayPalPayment.PAYMENT_INTENT_SALE
      );

    Intent intent = new Intent(reactContext, PaymentActivity.class);

    // send the same configuration for restart resiliency
    intent.putExtra(PayPalService.EXTRA_PAYPAL_CONFIGURATION, config);
    intent.putExtra(PaymentActivity.EXTRA_PAYMENT, payment);
    getCurrentActivity().startActivityForResult(intent, PAYPAL_REQUEST);
  }

  @Override
  public void onHostDestroy() {
    reactContext.stopService(new Intent(reactContext, PayPalService.class));
  }

  @Override
  public void onHostResume() {
    // Do nothing
  }

  @Override
  public void onHostPause() {
    // Do nothing
  }
}
