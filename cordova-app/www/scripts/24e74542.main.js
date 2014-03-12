"use strict";function DeviceLabConfig(){this.url="http://192.168.1.40:3000"}function DeviceController(){function a(a,d){var e=window.device.platform,f=-1;if("android"===e.toLowerCase()?f=0:"iphone"===e.toLowerCase()&&(f=1),-1===f)return void d("Tried to register a device which isn't Android or iOS");var g={name:window.device.model,nickname:c(),platformId:f,platformVersion:window.device.version,uuid:window.device.uuid},h=b();"undefined"!=typeof h&&null!==h&&(g.deviceId=h),a(g)}function b(){return d()?localStorage.getItem("device_id"):void 0}function c(){if(!d())return window.device.model;var a=localStorage.getItem("device-nickname");return("undefined"==typeof a||null===a)&&(a=window.device.model),a}function d(){return Modernizr&&Modernizr.localstorage}this.saveDevice=function(a){d()&&localStorage.setItem("device_id",a.device_id)},this.getDevice=function(b,c){"undefined"!=typeof window.device?a(b,c):document.addEventListener("deviceready",function(){a(b,c)},!1)}}function RegistrationController(){function a(a,d,e,f){c.getDevice(function(c){b(a,d,c,e,f)},function(a){f(a)})}function b(a,b,c,e,f){var g=new XMLHttpRequest;g.open("POST",d.url+"/devices/add/",!0),g.setRequestHeader("Content-type","application/x-www-form-urlencoded"),g.onreadystatechange=function(a){if(console.log("onreadystatechange",a),4===a.target.readyState)if(a.target.responseText.length>0){var b=JSON.parse(a.target.responseText);200!==a.target.status?f(b.error.msg):(c.device_id=b.data.device_id,e(c))}else f("Sorry, we couldn't add your device to the lab, there appears to be a problem with the server.")}.bind(this),g.timeout=1e4,g.ontimeout=function(){f("Sorry, we couldn't add your device to the lab, there appears to be a problem with the server.")};var h="id_token="+encodeURIComponent(a)+"&cloud_msg_id="+b+"&device_name="+encodeURIComponent(c.name)+"&device_nickname="+encodeURIComponent(c.nickname)+"&platform_id="+encodeURIComponent(c.platformId)+"&platform_version="+encodeURIComponent(c.platformVersion);"undefined"!=typeof c.deviceId&&null!==c.deviceId&&(h+="&device_id="+encodeURIComponent(c.deviceId)),g.send(h)}var c=new DeviceController,d=new DeviceLabConfig;this.registerDeviceWithLab=function(b,c,d){return"undefined"==typeof gcmlaunchbrowser?void d("The GCM Launch Browser plugin hasn't been installed"):void gcmlaunchbrowser.getRegistrationId(function(e){a(b,e.regId,c,d)},function(a){"undefined"!=typeof a&&a||(a="An unknown error occurred while setting up push notifications."),d(a)})}}function SignInController(){this.loginInToGPlus=function(a,b){return"undefined"==typeof cordova?void b("Cordova isn't available to the page"):"undefined"==typeof nativegplussignin?void b("The NativeGPlusSignIn plugin isn't loaded into the page"):void nativegplussignin.login(function(b){a(b)},function(a){b(a)})}}function AppController(){function a(a){if(c!==a){var b=document.querySelector(".sign-in"),g=document.querySelector(".loading"),h=document.querySelector(".home");switch(a){case e:g.classList.add("hide"),h.classList.add("hide"),b.classList.remove("hide");break;case d:g.classList.remove("hide"),b.classList.add("hide"),h.classList.add("hide");break;case f:g.classList.add("hide"),b.classList.add("hide"),h.classList.remove("hide")}c=a}}function b(b){h.registerDeviceWithLab(b,function(b){i.saveDevice(b),a(f)},function(b){a(e),window.alert("Error registering your device for push notifications:\n"+b)})}var c,d=0,e=1,f=2,g=new SignInController,h=new RegistrationController,i=new DeviceController;this.login=function(){a(d),g.loginInToGPlus(function(a){var c=a.id_token;b(c)},function(b){a(e),window.alert("An Error Occured While Loading the Page:\n"+b)})},this.logout=function(){a(LOGIN)},this.init=function(){var b=document.querySelector(".sign-in > .wrapper > button");b.addEventListener("click",function(a){a.preventDefault(),this.login()}.bind(this),!1);var c=document.querySelector(".home > .wrapper > button");c.addEventListener("click",function(a){a.preventDefault(),this.logout()}.bind(this),!1),a(e)}}"undefined"!=typeof cordova?document.addEventListener("deviceready",function(){var a=new AppController;a.init()},!1):console.log("Cordova is not loaded");