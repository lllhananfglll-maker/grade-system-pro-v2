/** auth/supabase-config.js — تهيئة عميل Supabase (آمنة للتحميل المتأخر والـ CDN) */
'use strict';

(function (root) {
  var GSP = root.GSP || (root.GSP = {});
  var _config = (GSP.application && GSP.application.services && GSP.application.services.configuration) || GSP.configuration || null;

  var SUPABASE_URL = _config && typeof _config.get === 'function'
    ? _config.get('supabaseUrl')
    : 'https://gxeqnmrakbrtychnfmvg.supabase.co';
  var SUPABASE_ANON_KEY = _config && typeof _config.get === 'function'
    ? _config.get('supabasePublishableKey')
    : 'sb_publishable_tx151DnMk_XPRB9BNlGcYg_ycZVNArB';

  // CDN الرسمي يعرّف عادةً window.supabase؛ بعض البيئات تستخدم supabaseJs
  var supabaseLib = root.supabase || root.supabaseJs || (GSP.supabase && GSP.supabase.createClient ? GSP.supabase : null);

  var supabaseClient = null;
  try {
    if (supabaseLib && typeof supabaseLib.createClient === 'function') {
      supabaseClient = supabaseLib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage: root.localStorage
        }
      });
    } else {
      console.warn('[GSP] مكتبة Supabase غير محمّلة بعد — المزامنة السحابية غير متاحة حتى يتوفر CDN.');
    }
  } catch (e) {
    console.error('تعذّر تهيئة اتصال Supabase:', e);
  }

  var cloudAvailable = !!supabaseClient;

  GSP.GRADE_SYSTEM_SUPABASE = GSP.GRADE_SYSTEM_SUPABASE || {};
  GSP.GRADE_SYSTEM_SUPABASE.url = SUPABASE_URL;
  GSP.GRADE_SYSTEM_SUPABASE.publishableKey = SUPABASE_ANON_KEY;

  GSP.SUPABASE_URL = SUPABASE_URL;
  GSP.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
  GSP.supabaseClient = supabaseClient;
  GSP.cloudAvailable = cloudAvailable;

  // إتاحة إعادة المحاولة بعد تحميل متأخر للـ CDN
  GSP.ensureSupabaseClient = function ensureSupabaseClient() {
    if (GSP.supabaseClient) return GSP.supabaseClient;
    var lib = root.supabase || root.supabaseJs;
    if (!lib || typeof lib.createClient !== 'function') return null;
    try {
      GSP.supabaseClient = lib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage: root.localStorage
        }
      });
      GSP.cloudAvailable = !!GSP.supabaseClient;
      return GSP.supabaseClient;
    } catch (err) {
      console.error('تعذّر إعادة تهيئة Supabase:', err);
      return null;
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
