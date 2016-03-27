'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the premium ' + chalk.red('generator-webapp') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What should I call this project?',
      default: this.appname
    },{
      type: 'confirm',
      name: 'sublimeText',
      message: 'Would you like to generate a Sublime Text project file?',
      default: true
    },{
      type: 'checkbox',
      name: 'deps',
      message: 'Which additional modules would you like?',
      choices: [{
        name: 'd3 (4.0.0-alpha)',
        value: 'd3',
        checked: true
      },{
        name: 'crossfilter (1.3)',
        value: 'crossfilter',
        checked: false
      },{
        name: 'lodash (4.6)',
        value: 'lodash',
        checked: false
      }],
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someAnswer;

      done();
    }.bind(this));
  },

  writing: {
    webpack: function () {
      this.fs.copy(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js')
      );
    },

    editorconfig: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    eslintrc: function () {
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );
    },

    gitignore: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    html: function () {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('src/html/index.html'),
        { name: this.props.name }
      );
    },

    js: function () {
      this.fs.copy(
        this.templatePath('index.js'),
        this.destinationPath('src/js/index.js')
      );
    },

    less: function () {
      this.fs.copy(
        this.templatePath('main.less'),
        this.destinationPath('src/less/main.less')
      );
    },

    project: function () {
      var slug = this.props.name.toLowerCase().split(/\s+/).join('-');

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        { name: slug, deps: this.props.deps }
      );

      if (this.props.sublimeText) {
        this.fs.copyTpl(
          this.templatePath('sublime-project'),
          this.destinationPath(this.props.name + '.sublime-project'),
          { path: this.destinationRoot() }
        );
      }
    }
  },

  install: function () {
    this.installDependencies({ bower: false });
  }
});
