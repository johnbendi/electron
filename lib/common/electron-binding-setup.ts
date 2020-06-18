// This should reflect the list in //shell/common/node_bindings.
const processTypes = {
  browser: [
    'app',
    'auto_updater',
    'browser_view',
    'content_tracing',
    'crash_reporter',
    'desktop_capturer',
    'dialog',
    'event',
    'event_emitter',
    'global_shortcut',
    'image_view',
    'in_app_purchase',
    'menu',
    'message_port',
    'net',
    'power_monitor',
    'power_save_blocker',
    'protocol',
    'session',
    'system_preferences',
    'top_level_window',
    'tray',
    'view',
    'web_contents',
    'web_contents_view',
    'web_view_manager',
    'window'
  ],
  common: [
    'asar',
    'clipboard',
    'command_line',
    'features',
    'native_image',
    'native_theme',
    'notification',
    'screen',
    'shell',
    'v8_util'
  ],
  renderer: [
    'context_bridge',
    'crash_reporter',
    'ipc',
    'web_frame'
  ]
};

export function electronBindingSetup (binding: typeof process['_linkedBinding']): typeof process['electronBinding'] {
  return function electronBinding (name: string) {
    if (processTypes.browser.includes(name)) {
      return binding(`electron_browser_${name}`);
    } else if (processTypes.renderer.includes(name)) {
      return binding(`electron_renderer_${name}`);
    } else if (processTypes.common.includes(name)) {
      return binding(`electron_common_${name}`);
    }

    throw new Error(`Unknown process type for binding with name ${name}`);
  };
}
