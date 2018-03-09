//
//  Crypto.m
//  LibertasMobile
//
//  Created by duydb on 11/18/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "Crypto.h"
#import <Crypto/Crypto.h>

@implementation Crypto

RCT_EXPORT_MODULE();

- (NSArray *)supportedEvents {
  return @[];
}

RCT_EXPORT_METHOD(decrypt:(NSString *)k
                  input:(NSString *)input
                  callback:(RCTResponseSenderBlock)callback) {
  CryptoAesCryptor * cryptor = [[CryptoAesCryptor alloc] init];
  NSData *bytes = [[NSData alloc] initWithBase64EncodedString:input options:0];
  NSData *retval = [cryptor decrypt:k input:bytes];
  NSString *res = [[NSString alloc] initWithData:retval encoding:NSASCIIStringEncoding];

  if (callback != NULL) {
    callback(@[res]);
  }
}

RCT_EXPORT_METHOD(encrypt:(NSString *)k
                  input:(NSString *)input
                  callback:(RCTResponseSenderBlock)callback) {
  CryptoAesCryptor * cryptor = [[CryptoAesCryptor alloc] init];
  NSData *bytes = [input dataUsingEncoding:NSUTF8StringEncoding];
  NSData *retval = [cryptor encrypt:k input:bytes];
  NSString *resp = [retval base64EncodedStringWithOptions:0];
  
  if (callback != NULL) {
    callback(@[resp]);
  }
}

RCT_EXPORT_METHOD(md5:(NSString *)input
                  callback:(RCTResponseSenderBlock)callback) {
  NSData *bytes = [input dataUsingEncoding:NSUTF8StringEncoding];
  NSData *retval = CryptoMd5(bytes);
  NSString *resp = [retval base64EncodedStringWithOptions:0];
  
  if (callback != NULL) {
    callback(@[resp]);
  }
}

RCT_EXPORT_METHOD(sha1:(NSString *)input
                  callback:(RCTResponseSenderBlock)callback) {
  NSData *bytes = [input dataUsingEncoding:NSUTF8StringEncoding];
  NSData *retval = CryptoSha1(bytes);
  NSString *resp = [retval base64EncodedStringWithOptions:0];
  
  if (callback != NULL) {
    callback(@[resp]);
  }
}

RCT_EXPORT_METHOD(sha256:(NSString *)input
                  callback:(RCTResponseSenderBlock)callback) {
  NSData *bytes = [input dataUsingEncoding:NSUTF8StringEncoding];
  NSData *retval = CryptoSha256(bytes);
  NSString *resp = [retval base64EncodedStringWithOptions:0];
  
  if (callback != NULL) {
    callback(@[resp]);
  }
}

RCT_EXPORT_METHOD(sha512:(NSString *)input
                  callback:(RCTResponseSenderBlock)callback) {
  NSData *bytes = [input dataUsingEncoding:NSUTF8StringEncoding];
  NSData *retval = CryptoSha512(bytes);
  NSString *resp = [retval base64EncodedStringWithOptions:0];
  
  if (callback != NULL) {
    callback(@[resp]);
  }
}

@end
