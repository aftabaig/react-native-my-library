import Foundation
import  CoreLocation
import NotificationCenter

@objc(MyLibrary)
open class MyLibrary: RCTEventEmitter , CLLocationManagerDelegate {
    
    
    public static var shared: MyLibrary?
    
    var locationManager =  CLLocationManager()
    
    
    override init() {
        super.init()
        MyLibrary.shared = self
        
        
        
    }
    
    
    @objc
    func sendLocationToReact(lat: Any) {
        
        
    }
    
    @objc func processHybridEvent(_ json: String) {
        // locationManager = CLLocationManager()
        
        locationManager.delegate = self
        
        locationManager.requestAlwaysAuthorization()
        
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        
        locationManager.startUpdatingLocation()
        
        if #available(iOS 9.0, *) {
            locationManager.allowsBackgroundLocationUpdates = true
        } else {
            
        }
        
        locationManager.pausesLocationUpdatesAutomatically = false
        
        locationManager.startMonitoringSignificantLocationChanges()
        let finalJson = json+" this is value"
        print("Swift Native processing event: \(finalJson)")
        
//        DispatchQueue.main.async {
//            var jsonObject: [String: Any]?
//            if let jsonData = finalJson.data(using: .utf8), let dict = try? JSONSerialization.jsonObject(with: jsonData, options: .mutableContainers) as? [String:Any] {
//                jsonObject = dict
//            }
//            //                NotificationCenter.default.post(name: NSNotification.Name("MyLibrary.Event"), object: self, userInfo: jsonObject)
//        }
        
    }
    
    @objc
    func postEvent(json: String) {
        self.sendEvent(withName: "MyLibrary.Event", body: json)
    }
    
   open override func supportedEvents() -> [String]! {
       return ["MyLibrary.Event","onLocationChange"];
    }
    
   open override func constantsToExport() -> [AnyHashable : Any]! {
        return [:]
    }
//    
//    @objc(multiply:withB:withResolver:withRejecter:)
//    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
//        resolve(a*b)
//    }
//    
    @objc
    static func requireMainQueueSetup() -> Bool {
        return true
    }
    
    @objc(division:withB:withResolver:withRejecter:)
    func division(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a/b)
    }

    @objc
    public func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        print("Latitude "  , locations.first?.coordinate.latitude ?? 0.0)
        let lat = locations.first?.coordinate.latitude
        let long = locations.first?.coordinate.longitude
        
        guard lat != nil else { return }
        guard long != nil else { return }
        
        sendEvent(withName: "onLocationChange", body: ["lat","\(lat!),\(long!)"])
    }
    
    @objc
    public func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("heloooooo errrroorrr" , error.localizedDescription)
    }
    
}

