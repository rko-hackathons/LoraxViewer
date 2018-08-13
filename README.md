Entry for the 2015 NASA International Space Apps Hackathon: Earth Challenge! 

Lorax Viewer
===
[![License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](https://github.com/mkobar/LoraxViewer//blob/master/LICENSE)

<img align="right" height="200" src="http://4.bp.blogspot.com/-nIhDGmiP2Vc/T1MD0BbiWxI/AAAAAAAABeQ/3DMn5DYC3YY/s1600/lorax1.png">

The Lorax Viewer is a mobile app (and API) that allows citizen scientists to report on forest deforestation and degradation due to man-made or natural effects/disasters. The app will (someday) also have trending and visualization of reported data, including visual mapping of current and historical data. Additional data feeds may be from open data sources or sensor feeds. 

**This project is solving the Forest Monitor Mapping challenge.**

## Lorax Viewer Inspiration
**Dr. Seuss** invented [The Lorax](http://en.wikipedia.org/wiki/The_Lorax) as one of the first environmental characters (*"I am the Lorax. I speak for the trees."*), and the story was a call to action for deforestation.

## The Mobile App
The Lorax Viewer app will be ported to both Android and Apple to allow anyone to participate as a citizen scientist and report on what they see around them in the way of land cover and how it is changing. This will allow mapping and reporting of forest deforestation and degradation due to man-made or natural effects/disasters. Additional reports will support trending and visualization.

## The Lorax Viewer API
The Lorax Viewer supports a custome API to store all data captured or reported by the app.  This data includes:

- Location of the reporting via GPS of the device
- Pictures taken by the reporter
- An unstructured text description of the location
  - including positive or negative land cover issues or events
- structured pre-defined and user-defined tags
- estimation of the size of the reporting area/effect
- date and time of the report
- and perhaps (future) a simple scale of emotional impact.

## App Components and Details

The app will use BlueMix for the back-end and database, but should also have the capability to work offline (for data capture).

The app itself should be in HTML5 and use either Phonegap/Cordova or Ionic Framework to allow support for Android/iOS/Windows/etc.

Would also like to ingest open data for historical trending. And ingest sensor feed data.

NASA project site: https://2015.spaceappschallenge.org/project/loraxviewer/

## License

Released under the [MIT License](http://opensource.org/licenses/MIT)

Copyright @ 2015 [RKOSecurity](http://www.rkosecurity.com)

