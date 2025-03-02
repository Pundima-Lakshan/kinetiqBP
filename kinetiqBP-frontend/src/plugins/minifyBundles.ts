import { minify } from 'terser';

// This is not optimized need to fix
export const minifyBundles = () => {
  return {
    name: 'minifyBundles',
    async generateBundle(_options: any, bundle: any) {
      for (const key in bundle) {
        if (bundle[key].type === 'chunk' && !key.includes('customFormEditor')) {
          const minifyCode = await minify(bundle[key].code, {
            sourceMap: false,
          });
          bundle[key].code = minifyCode.code;
        } else if (bundle[key].type === 'chunk' && key.includes('customFormEditor')) {
          bundle[key].code = bundle[key].code.replaceAll('formFields2', 'formFields');

          const minifyCode = await minify(bundle[key].code, {
            mangle: {
              reserved: ['RangeField', 'formFields.register', 'formFields'],
            },
            sourceMap: false,
          });
          bundle[key].code = minifyCode.code;
        }
      }
      return bundle;
    },
  };
};
