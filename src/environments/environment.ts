// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'http://localhost:8080',
  // apiURL: 'http://172.16.2.188:8080',

  // firebaseConfig : {
  //   apiKey: "AIzaSyAJUeLFc2FulvvUr8IvVuAsn32z80oXl04",
  //   authDomain: "library-bea8b.firebaseapp.com",
  //   projectId: "library-bea8b",
  //   storageBucket: "library-bea8b.appspot.com",
  //   messagingSenderId: "309048422051",
  //   appId: "1:309048422051:web:4fa630b48fbd0ab41e1916",
  //   measurementId: "G-KYPDLPJSBY"
  // }
  firebaseConfig : {
    apiKey: "AIzaSyDW2-RdozeRngNtOOtgf2uSV-Gpb_Uw3RQ",
    authDomain: "library-7f087.firebaseapp.com",
    projectId: "library-7f087",
    storageBucket: "library-7f087.appspot.com",
    messagingSenderId: "18225891578",
    appId: "1:18225891578:web:6936d593b9cfb6e5ba6143",
    measurementId: "G-SBK13BQRCW"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
