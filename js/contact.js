$(document).ready(function(){
    

(function () {

    const form = document.getElementById("contactForm");
    const button = document.getElementById("contactSubmit");
    const result = document.getElementById("contactResult");

    if (!form) {
        return;
    }


    form.addEventListener("submit", async function (event) {

        // 기본 form submit 차단
        event.preventDefault();


        // 전송 상태
        button.disabled = true;
        button.textContent = "전송 중...";

        result.textContent = "";
        result.className = "contact_result";


        try {

            const formData = new FormData(form);


            const response = await fetch(
                "https://formspree.io/f/xrpznrvz",
                {
                    method: "POST",

                    body: formData,

                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


            // ================================
            // 전송 성공
            // ================================

            if (response.ok) {

                result.textContent =
                    "문의가 정상적으로 전송되었습니다.";

                result.classList.add("success");

                // 입력 내용 초기화
                form.reset();

            }


            // ================================
            // Formspree 오류
            // ================================

            else {

                let data = {};

                try {
                    data = await response.json();
                } catch (error) {
                    // JSON 응답이 아니어도 처리
                }


                if (data.errors && data.errors.length > 0) {

                    result.textContent =
                        data.errors
                            .map(function (error) {
                                return error.message;
                            })
                            .join(", ");

                } else {

                    result.textContent =
                        "문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.";

                }

                result.classList.add("error");
            }


        }


        // ================================
        // 네트워크 오류
        // ================================

        catch (error) {

            console.error(
                "Formspree Error:",
                error
            );

            result.textContent =
                "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.";

            result.classList.add("error");

        }


        // ================================
        // 전송 상태 복구
        // ================================

        finally {

            button.disabled = false;
            button.textContent = "문의 보내기";

        }

    });

})();
})