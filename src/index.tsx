import { NativeModules } from 'react-native';

type MyLibraryType = {
  multiply(a: number, b: number): Promise<number>;
};

const { MyLibrary } = NativeModules;

export default MyLibrary as MyLibraryType;
