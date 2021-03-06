/*
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */

'use strict';

const assert = require('chai').assert;
const fs = require('fs-extra');
const path = require('path');
const yoAssert = require('yeoman-assert');
const helpers = require('yeoman-test');

const createElementGenerator =
    require('../../../lib/init/element/element').createElementGenerator;

suite('init/element', () => {

  test(
      'creates expected 1.x files while passed the 1.x template name',
      (done) => {
        const TestGenerator = createElementGenerator('polymer-1.x');
        helpers.run(TestGenerator)
            .withPrompts({name: 'foobar-element'})
            .on('end', (a) => {
              yoAssert.file(['bower.json']);
              yoAssert.fileContent('foobar-element.html', 'Polymer({');
              done();
            });
      });

  test(
      'creates expected 2.x files while passed the 2.x template name',
      (done) => {
        const TestGenerator = createElementGenerator('polymer-2.x');
        helpers.run(TestGenerator)
            .withPrompts({name: 'foobar-element'})
            .on('end', (a) => {
              yoAssert.file(['bower.json']);
              yoAssert.fileContent(
                  'foobar-element.html',
                  'class MyElement extends Polymer.Element');
              done();
            });
      });

  test(
      'ignoring filenames with dangling underscores when generating templates',
      (done) => {
        const TestGenerator = createElementGenerator('polymer-1.x');
        helpers.run(TestGenerator).on('end', (a) => {
          yoAssert.noFile(['_element.html']);
          done();
        });
      });

  test('works when package.json with no name is present', (done) => {
    const TestGenerator = createElementGenerator('polymer-1.x');
    helpers.run(TestGenerator)
        .inTmpDir((tempDir) => {
          fs.writeFileSync(path.join(tempDir, 'package.json'), '{}');
        })
        .on('error',
            (error) => {
              assert.fail();
              done();
            })
        .on('end', (a) => {
          done();
        });
  });


});
