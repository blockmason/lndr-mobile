package com.lndr.react.modules.paypal;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class PayPalModule extends ReactContextBaseJavaModule {

  public PayPalModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }
  @Override
  public String getName() {
    return "PayPalModule";
  }

  @ReactMethod
  public void initPayPal() {
  }

  @ReactMethod
  public void connectPayPal() {
  }

  @ReactMethod
  public void sendPayPalPayment(String amount, String currencyCode, String payeeEmail, String description) {
  }

}
