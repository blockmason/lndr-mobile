package com.lndr.react.modules.localization;

import android.os.Bundle;
import android.os.Build;
import android.content.Context;
import android.content.res.AssetManager;
import android.content.Context;
import com.facebook.react.bridge.ContextBaseJavaModule;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Properties;
import java.util.Locale;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class LocalizationModule extends ReactContextBaseJavaModule {
  private final ReactApplicationContext reactContext;

  public LocalizationModule(ReactApplicationContext reactContext) {
    super(reactContext);

    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "Localization";
  }

  private String getLocale() {
    Locale locale = getReactApplicationContext().getResources().getConfiguration().locale;
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      return locale.toLanguageTag();
    } else {
      StringBuilder builder = new StringBuilder();
      builder.append(locale.getLanguage());
      if (locale.getCountry() != null) {
        builder.append("-");
        builder.append(locale.getCountry());
      }
      return builder.toString();
    }
  }

  @Override
  public @Nullable
  Map<String, Object> getConstants() {
    HashMap<String, Object> constants = new HashMap<String, Object>();

    constants.put("deviceLocale", this.getLocale());

    return constants;
  }
}
