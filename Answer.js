var $ = function (selector) {
  var elements = [];

  

  console.log('executed');

  ////////////////////
  // Your code here //
  ////////////////////

  function Token(token,prefix) {
  	this.token = token;
  	this.pref = prefix;
  	this.getElements = this.getGetterByTokenType();
  }

  Token.prototype.getToken = function() {
  	return this.token;
  }

  Token.prototype.getPrefix = function() {
  	return this.pref;
  }

  Token.prototype.getGetterByTokenType = function() {
  		if (this.prefix = '.') {
  			return function() {
  				return document.getElementsByClassName(this.token);
  			}
  		} else if (this.prefix = '#') {
  			return function() {
  				return document.getElementsById(this.token);
  			}
  		} else {
  			return function() {
  				return document.getElementsByTagName(this.token);
  			}
  		}
  }

  function Tokenizer(selector) {
  	this.selector = selector; //TODO selector.replace(/\s*([^\w])\s*/g,"$1");
  	this.tokens = [];	
  }

  Tokenizer.prototype.getTokens = function() {
  	return this.tokens;
  }

  Tokenizer.prototype.tokenize = function() {
  	var token = "";
  	var selectorLength = this.selector.length;
  	var charIndex=selectorLength-1;
  	
  	for (;charIndex>=0;--charIndex) {
  		var character = this.selector.charAt(charIndex);

  		if ((character==='#') || (character==='.')) {
  			this.tokens.push(new Token(token, character));
  			token="";
  		} else {

  			token = character + token;
  			if (charIndex==0) {
  				this.tokens.push(new Token(token, ""));
  				token="";
  			}
  		}
  	}
  };

  var tokenizer = new Tokenizer(selector);
  tokenizer.tokenize();
  var tokens = tokenizer.getTokens();
  
  console.log('tokens -->');
  for (var i=0;i<tokens.length;++i) { //TODO foreach
  	console.log('token: [' + tokens[i].getToken() + '] tokenPrefix: [' + tokens[i].getPrefix() + ']');	
  }
  
  return elements;
}