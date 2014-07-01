var $ = function (selector) {
  var elements = [];

  function Token(token, prefix) {
  	this.token = token;
  	this.propertyName = this.determinePropertyName(prefix);
  	this.getElements = this.getGetterByTokenType();
  }

  Token.prototype.determinePropertyName = function(prefix) {
  		if (prefix=='.') {
  			return 'className';
  		} else if (prefix=='#') {
  			return 'id';
  		} else {
  			return 'tagName';
  		}
  }

  Token.prototype.getToken = function() {
  	return this.token;
  }

  Token.prototype.getPropertyName = function() {
  	return this.propertyName;
  }

  Token.prototype.getGetterByTokenType = function() {
  		if (this.propertyName === 'className') {
  			return function() {
  				return document.getElementsByClassName(this.token);
  			}
  		} else if (this.propertyName === 'id') {
  			return function() {
  				var list = [];
  				list.push(document.getElementById(this.token));
  				return list;
  			}
  		} else {
  			return function() {
  				return document.getElementsByTagName(this.token);
  			}
  		}
  }

  function Tokenizer(selector) {
  	this.selector = selector.replace(/\s*([^\w])\s*/g,"$1"); //TODO do some more preparations
  	this.tokens = [];	
  	this.tokenize();
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

  function contains(array, str) {
  	for (var i = 0; i<array.length;++i) {
		if (array[i] === str) {
			return true;
		}
  	}
  	return false;
  }

  function matches(elementToCheck, tokens) {

  		var matches=true;
	  	for (var i=1;i<tokens.length;++i) {
	  		var token = tokens[i];

	  		if (token.getPropertyName()==='className') { //dealing with multiple classes
  				var classArray = elementToCheck.className.split(" ");
  				if (!contains(classArray, token.getToken())) {
  					matches = false;
  					break;
  				}
  			} else {
  				if ((elementToCheck[token.getPropertyName()].toLowerCase() != token.getToken())) {
			      matches = false;
			      break;
			    }
  			}
  				
	  	}
	  	return matches;
  }

  function getElements(selector) {
  	var tokenElements= [];
  	var tokenizer = new Tokenizer(selector);
  	var tokens = tokenizer.getTokens();
  	
  	var firstToken = tokens[0];
  	
	var	tempElements = firstToken.getElements();

	if(tokens.length==1) { //so what the built in matcher returned is everything
		return tempElements;
	}

	for(var j=0;j<tempElements.length;++j) {
		var elementToCheck = tempElements[j];

		if (matches(elementToCheck, tokens)) {
			tokenElements.push(elementToCheck);
		}

 	}
 	return tokenElements;
  }

  elements = getElements(selector);
  return elements;
}