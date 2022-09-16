(function() {

    const slider = document.getElementById("myRange");
    const min = slider.min;
    const max = slider.max;
    const val = slider.value;
    const characterCount = document.querySelector(".characterCount");
    characterCount.textContent = slider.value;
    const boxes = document.querySelectorAll(".bar");

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]\:;?><,./-=";

    let admitedChars = lowercase + numbers + uppercase + symbols;
    const passwordInput = document.getElementById("passwordInput");

    function generatePassword(length, charset) {
        let password = "";

        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }

        return password;
    }

    function isChecked(el) {
        return el.checked ? true : false;
    }

    //Ajustar tamaño fondo
    slider.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';

    //Slider animado
    slider.addEventListener("input", (evt) => {
        let dynamicStrength = document.querySelector(".dynamicStrength");

        characterCount.textContent = evt.target.value;
        evt.target.style.backgroundSize = (evt.target.value - evt.target.min) * 100 / (evt.target.max - evt.target.min) + '% 100%';

        if (evt.target.value > 0 && evt.target.value < 12) {
            boxes[0].className = "bar red";
            boxes[1].className = "bar";
            boxes[2].className = "bar";
            boxes[3].className = "bar";
            dynamicStrength.textContent = "low";
            dynamicStrength.style.display = "flex";
        } else if (evt.target.value > 13 && evt.target.value < 24) {
            boxes[0].className = "bar yellow";
            boxes[1].className = "bar yellow";
            boxes[2].className = "bar";
            boxes[3].className = "bar";
            dynamicStrength.textContent = "low";
            dynamicStrength.style.display = "flex";
        } else if (evt.target.value > 25 && evt.target.value < 36) {
            boxes[0].className = "bar lightGreen";
            boxes[1].className = "bar lightGreen";
            boxes[2].className = "bar lightGreen";
            boxes[3].className = "bar";
            dynamicStrength.textContent = "medium";
            dynamicStrength.style.display = "flex";
        } else if (evt.target.value > 37 && evt.target.value < 50) {
            boxes[0].className = "bar green";
            boxes[1].className = "bar green";
            boxes[2].className = "bar green";
            boxes[3].className = "bar green";
            dynamicStrength.textContent = "hight";
            dynamicStrength.style.display = "flex";
        }
    });

    //Generar contraseña
    document.querySelector(".generatePasswordButton").addEventListener("click", () => {

        //Comprobar los checks marcados
        let checks = document.querySelectorAll(".checkChar");
        admitedChars = "";
        for (let i = 0; i < checks.length; i++) {

            if (isChecked(checks[i])) {
                if (checks[i].classList.contains("checkboxUppercase")) {
                    admitedChars += uppercase;
                }
                if (checks[i].classList.contains("checkboxLowercase")) {
                    admitedChars += lowercase;
                }
                if (checks[i].classList.contains("checkboxNumbers")) {
                    admitedChars += numbers;
                }
                if (checks[i].classList.contains("checkboxSymbols")) {
                    admitedChars += symbols;
                }
            } else {
                alert("Please check at least one box");
                break;
            }
        }

        passwordInput.value = generatePassword(slider.value, admitedChars);
    });

    //Copiar contraseña
    document.getElementById("copyPasswordButton").addEventListener("click", () => {
        let tooltipText = document.querySelector(".tooltiptext");

        passwordInput.select();
        passwordInput.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(passwordInput.value);
        tooltipText.style.cssText = "visibility: visible; opacity: 1;";

        setTimeout(() => {
            tooltipText.style.cssText = "visibility: hidden; opacity: 0;";
        }, 3000);
    });
})();