function main() {
    
    const media = window.matchMedia('(min-width: 700px)');
    const bill = document.getElementById('bill__input');
    const tips = document.querySelectorAll('.tip__input');
    const custom_tip = document.getElementById('custom-tip');
    const people = document.getElementById('people__input');
    const reset = document.getElementById('reset');
    const result_total = document.getElementById('result__total');
    const result_tip = document.getElementById('result__tip');
    const checkChange = [bill, custom_tip, people];

    media.addEventListener('change', (e) =>{
        if(!e.matches){
            result_total.style.fontSize = 'clamp(2rem, 4vw, 3rem)';
            result_tip.style.fontSize = 'clamp(2rem, 4vw, 3rem)';
        }
        calculateResult();
    });

    calculateResult();

    checkChange.forEach(elm =>{
        elm.addEventListener('input', calculateResult);
    });

    tips.forEach( tip =>{
        tip.addEventListener('click', e =>{
            e.target.checked = 'true';
            custom_tip.value = '';
            calculateResult(e);
        });
    });

    reset.addEventListener('click', resetInput);

    function currentTip() {
        tip_result = '0';
        tips.forEach(tip => {
            if(custom_tip.value){
                document.getElementById('custom').checked = 'true';
                tip_result = custom_tip.value;
                return custom_tip.value;
            }
            else if(tip.dataset.percent == 'custom' && tip.checked){
                document.getElementById('five').checked = 'true';
                tip_result = '5';
                return '5';
            }
            else if (tip.checked) {
                tip_result = tip.dataset.percent;
                return tip.dataset.percent;
            }
        });

        return tip_result;
    }
    
    function resultSize(precision, result){
        if(media.matches){
            if(precision - 3 > 15){
                result.style.fontSize = '1rem';
            } else if (precision - 3 > 11){
                result.style.fontSize = '1.3rem';
            }else if (precision - 3 > 6){
                result.style.fontSize = '2rem';
            }else{
                result.style.fontSize = '3rem';
            }
        }
    }

    function calculateResult(e) {
        const regexBill = /(?<first>^\d+?[.]\d+?$)|(?<second>^\d+?(?!\.)$)/;
        const regexPeople = /^\d*$/;
        const billValue = bill.value;
        const peopleValue = people.value;
        const tipValue = currentTip();
        console.log(tipValue);
        var output_total = '';
        var output_tip = '';

        if(peopleValue == '0'){
            people.style.outline = "1px solid red";
            people.value = "";
            reset.disabled = true;
            result_tip.textContent = '0.00';
            result_total.textContent = '0.00';
            document.getElementById('people__error').style.display = 'block';
            return;
        }else{
            people.style.outline = 'none';
            document.getElementById('people__error').style.display = 'none';
        }

        if (!billValue || !regexBill.test(billValue) || !peopleValue || !regexPeople.test(peopleValue)) {
            reset.disabled = true;
            result_tip.textContent = '0.00';
            result_total.textContent = '0.00';

        } else {
            reset.disabled = false;
            var billNum = parseFloat(billValue);
            var tipNum = parseFloat(tipValue);
            var peopleNum = parseFloat(peopleValue);


            output_tip = ((billNum * (tipNum / 100)) / peopleNum);
            var precision_tip = Math.round(output_tip).toString().length + 3;
            resultSize(precision_tip, result_tip);
            result_tip.textContent = Math.floor(output_tip * 100) / 100;

            output_total = (billNum / peopleNum ) + output_tip ;
            var precision_total = Math.round(output_total).toString().length + 3;
            resultSize(precision_total, result_total);
            result_total.textContent = Math.round(output_total * 100) / 100;

        }
    }

    function resetInput(e){
        bill.value = '';
        people.value = '';
        custom_tip.value = '';
        result_tip.textContent = '0.00';
        result_total.textContent = '0.00';
        document.getElementById('five').checked = 'true';
        reset.disabled = true;

    }

}

    window.addEventListener('DOMContentLoaded', main);