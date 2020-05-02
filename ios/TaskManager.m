//
//  TaskManager.m
//  BridgeApp
//
//  Created by Sanjay Kushwaha on 02/05/20.
//

#import "TaskManager.h"
#import <React/RCTLog.h>

@implementation TaskManager
RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(cpuFunctions,
                 resolver:(RCTPromiseResolveBlock)resolve //success's callback
                 rejecter:(RCTPromiseRejectBlock)reject){ //failed's callback
  NSInteger sum = 0;
  NSInteger i,j,k;

  for ( i = 0; i < 1000; i++) {
    for ( j = 0; j < 1000; j++) {
      for ( k = 0; k < 1000; k++) {
         sum = sum + i + j + k;
      }
    }
  }
  NSArray *tasks = @[
                      @{@"value": @(sum)}];
  if (sum) {
    //success's callback
    resolve(tasks);
  } else {
    //failed's callback
    NSString *code = @"500";
    NSString *message = @"Cannot get tasks, internal error";
    NSError *error = [NSError errorWithDomain:@"Internal Error"
                                         code:500 userInfo:@{
                                                             NSLocalizedDescriptionKey: @"Something wrong with tasks !"
                                                            }];
    reject(code, message, error);
    
  }
}
@end
