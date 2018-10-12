#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.cleverpush.reactnativetest/host.exp.exponent.MainActivity
