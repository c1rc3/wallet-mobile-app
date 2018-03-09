//
//  Steganos.m
//  LibertasMobile
//
//  Created by duydb on 11/21/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "Steganos.h"
#import <Crypto/Crypto.h>

@implementation Steganos

RCT_EXPORT_MODULE();

- (NSArray *)supportedEvents {
  return @[];
}

RCT_EXPORT_METHOD(hide:(NSString *)sourceBase64
                  data:(NSString *)data
                  callback:(RCTResponseSenderBlock)callback) {
  @try{
    SteganosJPEGStegano * steganos = [[SteganosJPEGStegano alloc] init];
    NSData *sourceBytes = [[NSData alloc] initWithBase64EncodedString:sourceBase64 options:0];
    NSData *dataBytes = [data dataUsingEncoding:NSUTF8StringEncoding];
    NSError *error = [[NSError alloc] init];
    NSData *retval = [steganos hide:sourceBytes data:dataBytes error:&error];
    NSString *res = [retval base64EncodedStringWithOptions:0];
    if (callback != NULL) {
      callback(@[res]);
    }
  }
  @catch (NSException *exception){
    NSLog(@"%@", exception.reason);
    if (callback != NULL) {
      callback(@[[NSNumber numberWithBool:false]]);
    }
  }
}

//
//RCT_EXPORT_METHOD(readHidden:(NSString *)sourceBase64
//                  callback:(RCTResponseSenderBlock)callback) {
//  @try{
//    SteganosJPEGStegano * steganos = [[SteganosJPEGStegano alloc] init];
//    NSData *sourceBytes = [[NSData alloc] initWithBase64EncodedString:sourceBase64 options:0];
//    NSData *retval = [steganos readHiddenFromStream:sourceBytes];
//    NSString *res = [[NSString alloc] initWithData:retval encoding:NSASCIIStringEncoding];
//    if (callback != NULL) {
//      callback(@[res]);
//    }
//  }
//  @catch (NSException *exception){
//    NSLog(@"%@", exception.reason);
//    if (callback != NULL) {
//      callback(@[[NSNumber numberWithBool:false]]);
//    }
//  }
//}


RCT_EXPORT_METHOD(readHidden:(NSString *)sourceBase64
                  callback:(RCTResponseSenderBlock)callback) {
  @try{
    SteganosJPEGStegano * steganos = [[SteganosJPEGStegano alloc] init];
    NSData *sourceBytes = [[NSData alloc] initWithBase64EncodedString:sourceBase64 options:0];
    NSError *error = [[NSError alloc] init];
    NSData *retval = [steganos readHidden:sourceBytes error:&error];
    NSString *res = [[NSString alloc] initWithData:retval encoding:NSUTF8StringEncoding];
    if (callback != NULL) {
      callback(@[res]);
    }
  }
  @catch (NSException *exception){
    NSLog(@"%@", exception.reason);
    if (callback != NULL) {
      callback(@[[NSNumber numberWithBool:false]]);
    }
  }
}

@end
