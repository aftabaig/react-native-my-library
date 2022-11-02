import { NativeModules, NativeEventEmitter } from 'react-native'
import { BehaviorSubject, Observable } from 'rxjs'

const { MyLibrary } = NativeModules;


const eventEmitter = new NativeEventEmitter(MyLibrary)

class Location {
    constructor (
        public lat: string,
        public lon: string
    ){}
}

class MyLibraryEvent {

    // we set up a private pipeline for events we can post to
    private postableEventBus = new BehaviorSubject<string>('')
    // and then expose it's observable for everyone to subscribe to
    eventBus = this.postableEventBus.asObservable()

    constructor() {
        eventEmitter.addListener('MyLibrary.Event', (body) => {
            console.log("bodydata=="+body)
             this.processEventFromNative(body)
             MyLibrary.processHybridEvent(body);
        })
    }

    postEvent(json: string) {
        this.postableEventBus.next(json)
        MyLibrary.processHybridEvent(json);
       
        this.eventBus.pipe().subscribe(data => {
        console.log("value===", data)
        });
    }

    processEventFromNative(jsonString: string) {
        this.postableEventBus.next(jsonString)
         console.log(`React-Native received event from nativee ${jsonString}`)
        
    }

   
}

//export = MyLibraryEvent;
export default MyLibraryEvent;