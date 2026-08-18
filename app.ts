const menuToggle = document.getElementById("menuToggle") as HTMLButtonElement | null;
const mobileMenu = document.getElementById("mobileMenu") as HTMLElement | null;

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("show");
    });
}


// Mobile navigation links
const mobileLinks = document.querySelectorAll<HTMLAnchorElement>(".mobile-link");

mobileLinks.forEach((link: HTMLAnchorElement) => {

    link.addEventListener("click", () => {

        if (mobileMenu) {
            mobileMenu.classList.remove("show");
        }

    });

});


//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------


const collectionCards =
    document.querySelectorAll<HTMLElement>(".collection-card");

collectionCards.forEach((card: HTMLElement) => {

    card.addEventListener("mouseenter", () => {
        card.classList.add("collection-active");
    });

    card.addEventListener("mouseleave", () => {
        card.classList.remove("collection-active");
    });

});



const exploreButtons =
    document.querySelectorAll<HTMLAnchorElement>(".explore-btn");

exploreButtons.forEach((button: HTMLAnchorElement) => {

    button.addEventListener("click", (event: MouseEvent) => {

        event.preventDefault();

        const card = button.closest(".collection-card");

        if (!card) return;

        const collectionName =
            card.querySelector("h3")?.textContent?.trim();

        if (collectionName) {
            console.log(`Exploring ${collectionName} Collection`);
        }

    });

});

// =========================================
// ABÍRA - ABOUT SECTION
// =========================================

const aboutButton =
    document.querySelector<HTMLAnchorElement>(".about-btn");


if (aboutButton) {

    aboutButton.addEventListener("click", (event: MouseEvent) => {

        event.preventDefault();

        const collectionsSection =
            document.getElementById("collections");


        if (collectionsSection) {

            collectionsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

}

// =========================================
// ABÍRA ACCOUNT SYSTEM
// =========================================

const accountArea =
    document.getElementById("accountArea") as HTMLDivElement | null;

const accountBtn =
    document.getElementById("accountBtn") as HTMLButtonElement | null;

const accountModal =
    document.getElementById("accountModal") as HTMLDivElement | null;

const accountClose =
    document.getElementById("accountClose") as HTMLButtonElement | null;


// Forms

const loginForm =
    document.getElementById("loginForm") as HTMLFormElement | null;

const signupForm =
    document.getElementById("signupForm") as HTMLFormElement | null;


// Tabs

const loginTab =
    document.getElementById("loginTab") as HTMLButtonElement | null;

const signupTab =
    document.getElementById("signupTab") as HTMLButtonElement | null;


// Switch buttons

const goToSignup =
    document.getElementById("goToSignup") as HTMLButtonElement | null;

const goToLogin =
    document.getElementById("goToLogin") as HTMLButtonElement | null;


// Profile

const profileView =
    document.getElementById("profileView") as HTMLDivElement | null;

const profileName =
    document.getElementById("profileName") as HTMLElement | null;

const profileEmail =
    document.getElementById("profileEmail") as HTMLElement | null;

const profileInitial =
    document.getElementById("profileInitial") as HTMLElement | null;

const logoutBtn =
    document.getElementById("logoutBtn") as HTMLButtonElement | null;


// Messages

const loginMessage =
    document.getElementById("loginMessage") as HTMLElement | null;

const signupMessage =
    document.getElementById("signupMessage") as HTMLElement | null;


// =========================================
// OPEN ACCOUNT
// =========================================

function openAccount(): void {

    if (accountModal) {
        accountModal.classList.add("show");
    }

}


// =========================================
// CLOSE ACCOUNT
// =========================================

function closeAccount(): void {

    if (accountModal) {
        accountModal.classList.remove("show");
    }

}


// =========================================
// NORMAL ACCOUNT BUTTON
// =========================================

accountBtn?.addEventListener("click", () => {

    const loggedIn =
        localStorage.getItem("abiraLoggedIn");

    const savedUser =
        localStorage.getItem("abiraUser");


    // Agar already login hai
    if (loggedIn === "true" && savedUser) {

        const user = JSON.parse(savedUser);

        showProfile(user);

    }

    // Agar login nahi hai
    else {

        showLogin();

    }


    openAccount();

});


// =========================================
// CLOSE
// =========================================

accountClose?.addEventListener("click", () => {

    closeAccount();

});


// Click outside popup

accountModal?.addEventListener(
    "click",
    (event: MouseEvent) => {

        if (event.target === accountModal) {

            closeAccount();

        }

    }
);


// =========================================
// LOGIN TAB
// =========================================

function showLogin(): void {

    loginTab?.classList.add("active");

    signupTab?.classList.remove("active");

    loginForm?.classList.add("active");

    signupForm?.classList.remove("active");

    profileView?.classList.remove("active");

}


loginTab?.addEventListener(
    "click",
    showLogin
);


// =========================================
// SIGN UP TAB
// =========================================

function showSignup(): void {

    signupTab?.classList.add("active");

    loginTab?.classList.remove("active");

    signupForm?.classList.add("active");

    loginForm?.classList.remove("active");

    profileView?.classList.remove("active");

}


signupTab?.addEventListener(
    "click",
    showSignup
);


goToSignup?.addEventListener(
    "click",
    showSignup
);


goToLogin?.addEventListener(
    "click",
    showLogin
);


// =========================================
// SIGN UP
// =========================================

signupForm?.addEventListener(
    "submit",
    (event: SubmitEvent) => {

        event.preventDefault();


        const nameInput =
            document.getElementById(
                "signupName"
            ) as HTMLInputElement;

        const emailInput =
            document.getElementById(
                "signupEmail"
            ) as HTMLInputElement;

        const passwordInput =
            document.getElementById(
                "signupPassword"
            ) as HTMLInputElement;


        const name =
            nameInput.value.trim();

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        if (!name || !email || !password) {

            if (signupMessage) {

                signupMessage.textContent =
                    "Please fill all fields.";

            }

            return;

        }


        const user = {

            name: name,

            email: email,

            password: password

        };


        localStorage.setItem(
            "abiraUser",
            JSON.stringify(user)
        );


        if (signupMessage) {

            signupMessage.textContent =
                "Account created successfully ♡";

        }


        setTimeout(() => {

            showLogin();

            const loginEmail =
                document.getElementById(
                    "loginEmail"
                ) as HTMLInputElement;

            if (loginEmail) {

                loginEmail.value = email;

            }

        }, 700);

    }
);


// =========================================
// LOGIN
// =========================================

loginForm?.addEventListener(
    "submit",
    (event: SubmitEvent) => {

        event.preventDefault();


        const emailInput =
            document.getElementById(
                "loginEmail"
            ) as HTMLInputElement;

        const passwordInput =
            document.getElementById(
                "loginPassword"
            ) as HTMLInputElement;


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        const savedUser =
            localStorage.getItem(
                "abiraUser"
            );


        if (!savedUser) {

            if (loginMessage) {

                loginMessage.textContent =
                    "Please create an account first.";

            }

            return;

        }


        const user = JSON.parse(savedUser);


        if (
            email === user.email &&
            password === user.password
        ) {

            // Login successful

            localStorage.setItem(
                "abiraLoggedIn",
                "true"
            );


            showProfile(user);

            updateNavbarProfile(user);

        }

        else {

            if (loginMessage) {

                loginMessage.textContent =
                    "Incorrect email or password.";

            }

        }

    }
);


// =========================================
// SHOW PROFILE
// =========================================

function showProfile(user: {
    name: string;
    email: string;
}): void {

    loginForm?.classList.remove("active");

    signupForm?.classList.remove("active");

    loginTab?.classList.remove("active");

    signupTab?.classList.remove("active");

    profileView?.classList.add("active");


    if (profileName) {

        profileName.textContent =
            user.name;

    }


    if (profileEmail) {

        profileEmail.textContent =
            user.email;

    }


    if (profileInitial) {

        profileInitial.textContent =
            user.name
                .charAt(0)
                .toUpperCase();

    }

}


// =========================================
// PROFILE ICON IN NAVBAR
// =========================================

function updateNavbarProfile(user: {
    name: string;
    email: string;
}): void {

    if (!accountArea) return;


    accountArea.innerHTML = "";


    const profileButton =
        document.createElement("button");


    profileButton.className =
        "logged-profile-btn";


    profileButton.type =
        "button";


    profileButton.textContent =
        user.name
            .charAt(0)
            .toUpperCase();


    profileButton.title =
        "My Account";


    accountArea.appendChild(
        profileButton
    );


    // ⭐ MOST IMPORTANT PART

    profileButton.addEventListener(
        "click",
        () => {

            showProfile(user);

            openAccount();

        }
    );

}


// =========================================
// LOGOUT
// =========================================

logoutBtn?.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "abiraLoggedIn"
        );


        location.reload();

    }
);


// =========================================
// CHECK LOGIN AFTER REFRESH
// =========================================

function checkLoggedInUser(): void {

    const loggedIn =
        localStorage.getItem(
            "abiraLoggedIn"
        );

    const savedUser =
        localStorage.getItem(
            "abiraUser"
        );


    if (
        loggedIn === "true" &&
        savedUser
    ) {

        const user =
            JSON.parse(savedUser);


        updateNavbarProfile(user);

    }

}


checkLoggedInUser();