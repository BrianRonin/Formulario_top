class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector(".formulario");
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasValidas();
    if (camposValidos && senhasValidas) {
      alert("ok, roubei seus dados");
    }
  }
  senhasValidas() {
    let valid = true;
    const senha = this.formulario.querySelector(".senha");
    const repeatSenha = this.formulario.querySelector(".repeatSenha");
    if (senha.value !== repeatSenha.value) {
      valid = false;
      this.criaErro(senha, "senha tem que ser igual");
      this.criaErro(repeatSenha, "senha tem que ser igual");
    }
    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaErro(senha, "senha deve conter entre 6 - 12 caracteres");
      this.criaErro(repeatSenha, "senha deve conter entre 6 - 12 caracteres");
    }

    return valid;
  }

  camposSaoValidos() {
    let valid = true;
    for (let errorText of this.formulario.querySelectorAll(".error-text")) {
      errorText.remove();
    }
    for (let input of document.querySelectorAll("input")) {
      const label = input.nextElementSibling.innerText;
      if (!input.value) {
        this.criaErro(input, `campo ${label} não pode estar em branco`);
        valid = false;
      } else if (input.classList.contains("cpf")) {
        if (!this.validaCPF(input)) {
          valid = false;
        }
      }
      if (input.classList.contains("usuario")) {
        if (!this.validaUsuario(input)) {
          valid = false;
        }
        if (!input.value.match(/^[a-zA-Z0-9]+$/g)) {
          valid = false;
          this.criaErro(input, "usuario deve conter apenas letras ou numeros");
        }
      }
    }
    return valid;
  }
  validaUsuario(input) {
    let valid = true;
    if (input.value.length > 12 || input.value.length < 3) {
      this.criaErro(input, "usuario deve conter entre 3 - 12 caracteres");
      valid = false;
    }
    return valid;
  }
  validaCPF(input) {
    let cpf32 = new ValidaCPF(input.value);
    if (!cpf32.valida()) {
      this.criaErro(input, "CPF invalido");
      return false;
    }
    return true;
  }
  criaErro(campo, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("error-text");
    campo.insertAdjacentElement("afterend", div);
  }
}

const valida = new ValidaFormulario();
