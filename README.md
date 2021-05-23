## JS Screensaver

Simple library to run screensaver on your website.

Run screensaver without any configuration:

```javascript
JsScreensaver.start();
```

This will run the predefined screensaver with basic message and styling.
It's possible to extend the basic screensaver with the following options in the object.

- `text` - insert your message inside the default screensaver,
- `background` - change the background color the default screensaver,
- `baseElement` - by default, screensaver is embeded into __body__ but you can choose any DOM element from your page
                  to insert the screensaver there.
- `animationSpeed` - choose the animation speed. There are 3 options - *slow*, *regular*, *fast*. Default value is set to regular.
- `customElement` - replace the default screensaver element with your custom element. You can put __Node Element__ or raw HTML in string.
- `triggerTime` - the time in miliseconds after which screensaver will be launched.
                  
