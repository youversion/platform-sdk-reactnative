require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'YouVersionReactNative'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.platforms      = {
    :ios => '17.0',
    :tvos => '17.0'
  }
  s.swift_version  = '5.9'
  s.source         = { git: 'https://github.com/youversion/yvp-react-native-sdk' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'
  s.dependency 'YouVersionPlatform'
  s.dependency 'YouVersionPlatformCore'
  s.dependency 'YouVersionPlatformUI'
  s.dependency 'YouVersionPlatformReader'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end
