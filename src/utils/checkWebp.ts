declare type featureType = 'lossy' | 'lossless' | 'alpha' | 'animation';
/**
 * 判断当前浏览器是否支持webp格式图片
 * @param feature
 * @param callback
 */
export default function check_webp_feature(
  feature: featureType,
  callback: (a: featureType, b: boolean) => any
) {
  var kTestImages = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha:
      'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation:
      'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
  };
  var img = new Image();
  img.onload = function() {
    var result = img.width > 0 && img.height > 0;
    callback(feature, result);
  };
  img.onerror = function() {
    callback(feature, false);
  };
  img.src = 'data:image/webp;base64,' + kTestImages[feature];
}
