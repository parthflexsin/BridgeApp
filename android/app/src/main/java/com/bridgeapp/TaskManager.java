package com.bridgeapp;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.lang.reflect.Array;
import java.util.HashMap;
import java.util.Map;

import androidx.annotation.NonNull;

public class TaskManager extends ReactContextBaseJavaModule {
    public TaskManager(ReactApplicationContext context){
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "TaskManager";
    }

    public  static long iterations(){
        long sum = 0;
        for (int i = 0; i < 1000; i++) {
            for (int j = 0; j < 1000; j++) {
                for (int k = 0; k < 1000; k++) {
                    sum = sum + i + j + k;

                }
            }
        }
        return sum;
    }

    @ReactMethod
    public void cpuFunctions(Promise promise){
        try{
            String value= String.valueOf(iterations());

            promise.resolve(value);
        }
        catch (Exception e){
            promise.reject("Error is: ",e);
        }
    }


}
