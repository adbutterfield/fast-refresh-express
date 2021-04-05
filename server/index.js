require('dotenv-defaults/config');
require('@babel/register')({ extensions: ['.js', '.ts', '.tsx'] });
require('./app.ts');
