package com.starter;

import com.reactnativenavigation.NavigationActivity;
import org.devio.rn.splashscreen.SplashScreen; // here
import android.os.Bundle; // here

public class MainActivity extends NavigationActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

    //@Override
    protected String getMainComponentName() {
        return "Starter";
    }
}
