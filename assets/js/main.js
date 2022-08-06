(function () {
  const fields = document.querySelectorAll("[required]");
  //error messagin
  for (field of fields) {
    $(field).keyup(function (event) {
      customValidation(event);
    });
    field.addEventListener("invalid", (event) => {
      //eliminar booble
      event.preventDefault();
      customValidation(event);
    });

    function validateField(field) {
      function verifyErrors() {
        //logic to check for errors
        let foundError = false;
        for (let error in field.validity) {
          if (field.validity[error] && !field.validity.valid) {
            foundError = error;
          }
        }
        return foundError;
      }

      function customMessage(typeError) {
        const messages = {
          text: {
            valueMissing: "Campo obrigatório",
          },
          email: {
            valueMissing: "Email obrigatório",
            typeMismatch: "Preencha com email válido",
          },
          password: {
            valueMissing: "Senha obrigatória",
            tooShort: "Senha deve conter 8 caracteres",
            customError: "Repita a primeira senha",
          },
          tel: {
            valueMissing: "Numero obrigatório",
            patternMismatch: "(00) 00000-0000",
          },
        };
        console.log(typeError);
        return messages[field.type][typeError];
      }

      function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error");

        if (message) {
          spanError.classList.add("active");
          spanError.innerHTML = message;
        } else {
          spanError.classList.remove("active");
          spanError.innerHTML = "";
        }
      }
      return function () {
        const error = verifyErrors();

        if (error) {
          const message = customMessage(error);
          field.style.borderColor = "red";
          setCustomMessage(message);
        } else {
          field.style.borderColor = "cyan";
          setCustomMessage();
        }
      };
    }

    function customValidation(event) {
      const field = event.target;
      const validation = validateField(field);

      validation();
    }
  }
  //validar cpf
  const inputCpf = document.getElementById("input-cpf");
  const labelErrorCpf = document.getElementById("label-cpf");
  inputCpf.addEventListener("keyup", () => {
    let cpf = inputCpf.value;
    if (cpf.length === 14) {
      validateCpf(cpf);
    }
  });
  function validateCpf(cpf) {
    cpf = cpf.replace(/\D+/g, "");
    let tempCpf = Array.from(cpf).slice(0, -2);
    //if (cpf.length < 11) return alert("escreve direito meu filho");
    let digito1 = tempCpf.reduce(function (ac, valor, indice) {
      x = 10 - indice;
      y = parseInt(valor);
      ac += y * x;
      console.log(ac);
      return ac;
    }, 0);
    digito1 = 11 - (digito1 % 11);
    digito1 = `${digito1}`;
    tempCpf.push(digito1);
    digito2 = tempCpf.reduce(function (ac, valor, indice) {
      x = 11;
      x = x - indice;
      y = parseInt(valor);
      console.log(y, " * ", x);
      ac += y * x;
      console.log(ac);
      return ac;
    }, 0);
    digito2 = 11 - (digito2 % 11);
    digito2 = `${digito2}`;
    tempCpf.push(digito2);
    tempCpf = tempCpf.join("");

    if (cpf.charAt(0).repeat(cpf.length) === cpf) {
      labelErrorCpf.classList.add("active");
      labelErrorCpf.innerText = "Voce só tem um numero no teclado?";
    } else if (tempCpf === cpf) {
      console.log(cpf, tempCpf);
    } else {
      console.log(cpf, tempCpf);
      labelErrorCpf.classList.add("active");
      labelErrorCpf.innerText = "CPF invalido";
    }
  }
  //format cpf
  inputCpf.addEventListener("keydown", function (event) {
    var selection = window.getSelection().toString();
    if (selection !== "") {
      return;
    }

    2;
    if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
      return;
    }
    var $this = $(this);
    var input = $this.val();

    // 2
    input = input.replace(/[\W\s\._\-]+/g, "");

    // 3
    var split = 4;
    var chunk = [];

    for (var i = 0, len = input.length; i < len; i += split) {
      split = i >= 8 && i <= 16 ? 2 : 3;
      chunk.push(input.substr(i, split));
    }

    // 4
    $this.val(function () {
      console.log(chunk);
      return chunk.join("-").toUpperCase();
    });
  });
  const inputCell = document.getElementById("input-cell");
  //format cell
  inputCell.addEventListener("keydown", function (event) {
    var selection = window.getSelection().toString();
    if (selection !== "") {
      return;
    }

    2;
    if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
      return;
    }
    var $this = $(this);
    var input = $this.val();

    // 2
    input = input.replace(/[\W\s\._\-]+/g, "");

    // 3
    var split = 4;
    var chunk = [];

    for (var i = 0, len = input.length; i < len; i += split) {
      chunk.push;
      split = i >= 2 && i <= 10 ? 5 : 2;

      chunk.push(input.substr(i, split));
    }

    // 4
    $this.val(function () {
      x = chunk.join("-").toUpperCase();
      return x;
    });
  });
  //format sem caracteres especiais
  $(".no-special-chars").on("input", function () {
    $(this).val(
      $(this)
        .val()
        .replace(/[^a-z0-9 ]/gi, "")
    );
  });
  const submit = document.getElementById("submit-form");
  const passwordInput = document.getElementById("input-senha");
  const confirmPassword = document.getElementById("input-repeat-senha");

  //validar senha
  submit.addEventListener("click", function () {
    if (passwordInput.value != confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords Don't Match");
    } else {
      confirmPassword.setCustomValidity("");
    }
  });
})();
//
