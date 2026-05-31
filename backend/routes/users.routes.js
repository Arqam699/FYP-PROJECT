import express from "express";
import {askToAssistant,currentUser,updateAssistant} from "../controllers/user.controller.js";
import activeWin from "active-win";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import nodemailer from "nodemailer";
import path from "path";

import {exec,execFile} from "child_process";

const userRouter = express.Router();

// CURRENT USER
userRouter.get("/current",isAuth,currentUser);

// UPDATE ASSISTANT
userRouter.post("/update",isAuth,upload.single("assistantImage"), updateAssistant);

// GEMINI ASSISTANT
userRouter.post("/asktoassistant",isAuth,askToAssistant);

const apps = {
    // SOCIAL APPS
    whatsapp: {
        desktop: "start whatsapp:",
        web: "https://web.whatsapp.com"
    },
    spotify: {
        desktop: "start spotify:",
        web: "https://spotify.com"
    },
    telegram: {
        desktop: "start tg:",
        web: "https://web.telegram.org"
    },
    discord: {
        desktop: "start discord:",
        web: "https://discord.com/app"
    },
    // WEBSITES
    youtube: {
        desktop: "start https://youtube.com",
        web: "https://youtube.com"
    },
    google: {
        desktop: "start https://google.com",
        web: "https://google.com"
    },
    instagram: {
        desktop: "start https://instagram.com",
        web: "https://instagram.com"
    },
    facebook: {
        desktop: "start https://facebook.com",
        web: "https://facebook.com"
    },
    linkedin: {
        desktop: "start https://linkedin.com",
        web: "https://linkedin.com"
    },
    gmail: {
        desktop: "start https://mail.google.com",
        web: "https://mail.google.com"
    },
    netflix: {
        desktop: "start https://netflix.com",
        web: "https://netflix.com"
    },
    amazon: {
        desktop: "start https://amazon.com",
        web: "https://amazon.com"
    },
    chatgpt: {
        desktop: "start https://chatgpt.com",
        web: "https://chatgpt.com"
    },
    maps: {
        desktop: "start https://maps.google.com",
        web: "https://maps.google.com"
    },
    twitter: {
        desktop: "start https://x.com",
        web: "https://x.com"
    },
    // DESKTOP APPS
    vscode: {
        desktop: "start code"
    },
    chrome: {
        desktop: "start chrome"
    },
    calculator: {
        desktop: "calc"
    },
    notepad: {
        desktop: "notepad"
    },
    paint: {
        desktop: "mspaint"
    },
    cmd: {
        desktop: "cmd"
    },
    explorer: {
        desktop: "explorer"
    },
    camera: {
        desktop: "start microsoft.windows.camera:"
    },
    steam: {
        desktop: "start steam"
    },
    vlc: {
        desktop: "start vlc"
    },
    word: {
        desktop: "start winword"
    },
    excel: {
        desktop: "start excel"
    },
    powerpoint: {
        desktop: "start powerpnt"
    },
    // BROWSERS
   edge: {
    desktop: "start msedge"
    },
    firefox: {
    desktop: "start firefox"
    },
     opera: {
     desktop: "start opera"
    },
    brave: {
    desktop: "start brave"
     },
// MEDIA
    music: {
    desktop: "start wmplayer"
     },
     photos: {
    desktop: "start ms-photos:"
    },
    movies: {
    desktop: "start microsoft.zunemusic:"
    },
    // OFFICE
    outlook: {
    desktop: "start outlook" 
    },
    onenote: {
    desktop: "start onenote"
     },
  // WINDOWS TOOLS
    taskmanager: {
    desktop: "taskmgr"
    },
     controlpanel: {
    desktop: "control"
     },
    settings: {
    desktop: "start ms-settings:"
     },
    downloads: {
    desktop: "explorer shell:Downloads"
      },
    documents: {
    desktop: "explorer shell:DocumentsLibrary"
      },
    desktop: {
    desktop: "explorer shell:Desktop"
    },
    recyclebin: {
    desktop: "start shell:RecycleBinFolder"
    },
    // DEV TOOLS
    postman: {
    desktop: "start postman"
     }, 
    docker: {
    desktop: "start docker"
    },
    xampp: {
    desktop: "start xampp-control"
    },
    androidstudio: {
    desktop: "start studio64"
   },
    pycharm: {
    desktop: "start pycharm64"
    },
    intellij: {
    desktop: "start idea64"
    },
    // ADOBE
    photoshop: {
    desktop: "start photoshop"
     },
     illustrator: {
    desktop: "start illustrator"
     },
    premierepro: {
    desktop: "start premiere"
     },
    aftereffects: {
    desktop: "start afterfx"
    },

// GAMING
epicgames: {
    desktop: "start com.epicgames.launcher://"
},

valorant: {
    desktop: "start valorant"
},

pubg: {
    desktop: "start pubg"
},

// COMMUNICATION
teams: {
    desktop: "start ms-teams:"
},

zoom: {
    desktop: "start zoommtg:"
},

skype: {
    desktop: "start skype:"
},

// UTILITIES
calculator: {
    desktop: "calc"
},

snippingtool: {
    desktop: "snippingtool"
},

registryeditor: {
    desktop: "regedit"
},


terminal: {
    desktop: "wt"
}
};

userRouter.post("/open-app",async (req, res) => {
        try {
            let { app } = req.body;

            app = app.toLowerCase().replace(/\s/g, "");
            const selectedApp = apps[app];
            // APP NOT FOUND
            if (!selectedApp) {

                return res.json({success: true,type: "web",url: `https://${app}.com`});
            }
            // OPEN APP
            exec(selectedApp.desktop,
                (error) => {

                    // FAILED
                    if (error) {

                        // DIRECT WEBSITE
                    return res.json({success: true,type: "web",url: selectedApp.web});
                    }
                    // SUCCESS
                    return res.json({success: true,type: "desktop"});
                }
            );

        } catch (error) {

            console.log(error);

            return res.status(500).json({success: false});
        }
    }
);

  userRouter.post("/system",async (req, res) => {

        try {

            const {action,volume,app,tabName} = req.body;
            // FULL PATH
            const nircmdPath = path.join(process.cwd(),"nircmd.exe");

// SET SPECIFIC VOLUME

if (
    action === "set_volume"
) {

    try {

        let finalVolume = parseInt(volume);
        if (
            isNaN(finalVolume)
        ) {

            finalVolume = 50;
        }
        // LIMIT
        finalVolume = Math.max(0,Math.min(100,finalVolume));

        // CONVERT
        const winVolume = Math.floor((65535 * finalVolume) / 100 );
        exec(
            `"${nircmdPath}" setsysvolume ${winVolume}`,
            (error) => {

                if (error) {

                    console.log("Volume Error:",error);
                    return res.status(500).json({
                        success: false
                    });
                }

                // SHOW WINDOWS VOLUME UI
                exec(
                    `"${nircmdPath}" sendkeypress 0xAF`
                );

                return res.json({
                    success: true
                });
            }
        );

    }  
    catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false
        });
    }

    return;
}

// MUTE

if (action ==="mute") {

exec(
    `"${nircmdPath}" mutesysvolume 1`,
    (error) => {

        if (error) {

            console.log("Mute Error:",error);

            return res.status(500).json({
                success: false
            });
        }

        return res.json({
            success: true
        });
    }
);

return;

}

// UNMUTE

if (action ==="unmute") {

exec(
    `"${nircmdPath}" mutesysvolume 0`,
    (error) => {

        if (error) {

            console.log("Unmute Error:",error );

            return res.status(500).json({
                success: false
            });
        }

        return res.json({
            success: true
        });
    }
);

return;

}

// SHUTDOWN PC


if ( action === "shutdown")
     {

    exec(
        `shutdown /s /t 0`,
        (error) => {

            if (error) {

                console.log("Shutdown Error:",error);

                return res.status(500).json({
                    success: false
                });
            }

            return res.json({
                success: true
            });
        }
    );

    return;
}

// RESTART PC
if (action === "restart") {

    exec(
        `shutdown /r /t 0`,
        (error) => {

            if (error) {

                console.log("Restart Error:",error );

                return res.status(500).json({
                    success: false
                });
            }

            return res.json({
                success: true
            });
        }
    );

    return;
}

// LOCK SCREEN


if (action === "lock") {

    exec(
        `rundll32.exe user32.dll,LockWorkStation`
    );

    return res.json({
        success: true
    });
}

// CLOSE SPECIFIC TAB

if (action ==="close_specific_tab") {

try {

    exec(
        `"${nircmdPath}" sendkeypress ctrl+w`,
        (error) => {

            if (error) {
             console.log("Close Tab Error:",error);

                return res.status(500).json({
                    success: false
                });
            }

            return res.json({
                success: true
            });
        }
    );

}
 catch (error) {

    console.log(error);
    return res.status(500).json({
        success: false
    });
}

return;

}

// CLOSE APP


if (action ==="close_app") {
    try {

        const appName =app.toLowerCase().trim();

        console.log("Searching App:",appName);

        exec(
            "tasklist",
            (error, stdout) => {

                if (error) {

                    console.log(
                        error
                    );

                    return res.status(500).json({
                        success: false
                    });
                }

                const lines =
                    stdout.split("\n");

                // find matching process
                const matched = lines.find((line) =>line.toLowerCase().includes(appName ) );
                if (!matched) {

                    console.log("App not running");
                    return res.status(404).json({
                        success: false,
                        message:
                            "App not found"
                    });
                }
                // extract exe name
                const processName = matched.trim().split(/\s+/)[0];

                console.log("Matched Process:",processName );
                exec(
                    `taskkill /F /IM "${processName}"`,
                    (
                        killError,
                        killStdout
                    ) => {

                        if (
                            killError
                        ) {

                            console.log(
                                killError
                            );

                            return res.status(500).json({
                                success: false
                            });
                        }

                        console.log(
                            killStdout
                        );

                        return res.json({
                            success: true
                        });
                    }
                );
            }
        );

    } 
    catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false
        });
    }

    return;
}
            return res.json({
                success: true
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                success: false,
                error
            });
        }
    }
);

// conatct router

userRouter.post("/send-contact",async (req, res) => {
    try {

        const {name,email,type,message } = req.body;

        // GMAIL TRANSPORT

        const transporter =
            nodemailer.createTransport({

                service: "gmail",

                auth: {

                    user: "arqamiftikhar7@gmail.com",

                    pass: "vivz xsrc kxvx najk "
                }
            });

        // EMAIL OPTIONS

        const mailOptions = {

            from: email,

            to: "arqamiftikhar7@gmail.com",

            subject:
                `New Contact Form Message (${type})`,

            html: `

                <h2>New Contact Message</h2>

                <p>
                    <strong>Name:</strong>
                    ${name}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${email}
                </p>

                <p>
                    <strong>Type:</strong>
                    ${type}
                </p>

                <p>
                    <strong>Message:</strong>
                    ${message}
                </p>

            `
        };

        await transporter.sendMail(
            mailOptions
        );

        return res.json({
            success: true
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false
        });
    }
}


);

export default userRouter;