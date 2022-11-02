import { NativeModules } from 'react-native';

type MyLibraryType = {
//  responseCallback(): String;
  multiply(a: number, b: number): Promise<number>;
//  supportedEvents():Promise<[string];
  // printHello(): Promise<void>;
//  didUpdateLocation(): Promise<void>
  // printHello(): void
};



const { MyLibrary} = NativeModules;

export default MyLibrary as MyLibraryType;
