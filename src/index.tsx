import { NativeModules } from 'react-native';

type MyLibraryType = {
  // get native exported mehthod here
};

const { MyLibrary } = NativeModules;

export default MyLibrary as MyLibraryType;
