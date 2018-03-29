# Circe Wallet Mobile App - A blockchain wallet

## 1. Quick start

Install
```
npm install 
```

Run in iOS

```
npm run ios
``` 

Run in Android

```
npm run android
``` 

## 2. Run Tests

```
npm test
``` 

## 3. Project Structure

 - **__tests__**: *Tests*
 - **src**: *Source code*
    - **assets**: *All assets*
    - **component**: *All reusable component*
    - **config**: *Config of project: app config, declare icons*
    - **entity**: *All reusable entity*
    - **screen**: *All Screen Component of Project*
    - **service**: *All services*
    - **store**: *Contain Redux Store*
    - **util**: *util*
    - **app.js**: *Main App*

### **src/screen**: All Screen Components
 - **const.js**: *Define constant for screen: screen ids, screen options*
 - **commons**: *Define CommonScreen with common options*
 - **index.js**: *Register Screens*
 - **Main/index.js**: *Main Screen. Contain actions for navigate screen app with permission*
 
### **src/store**: Redux Store

 - **auth**: *auth Store*
 - **transaction-monitor**: *Transaction Monitor Store*
 - **wallet**: *Wallet Store*

**Notes**: each store have contain structure
 - *const.js*: *Define action types, constant*
 - *actions.js*: *Define actions*
 - *index.js*: *Store & common action using on Screen*
 - *reducers.js*: *Define reducers*

## 4. Dependencies

 - [react-native](https://github.com/facebook/react-native)
 - [react-native-navigation](https://wix.github.io/react-native-navigation)
 - [redux](https://github.com/reactjs/redux)
 - [react-redux](https://github.com/reactjs/react-redux)
 - [deneric](https://www.npmjs.com/package/deneric)