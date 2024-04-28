This document is made to serve as a guide for setting up Spotify Integration inside muffon.

Connecting your Spotify account to muffon is a fairly complicated task for the non tech-savvy and this document is aimed to make it simpler for them.

# Prerequisites
- **Ensure you are logged in to muffon.** muffon allows you to do certain activities while being anonymous, and this feature is **NOT** one of them.
- **Have Spotify account.**

That's it, that's what you initially need.

# Setting up Spotify to connect with muffon

Integrating Spotify inside muffon has been quite sketchy for us (the devs). Therefore, we've used some complicated methods to help users connect to the platform.

For this, you need to have a developer **ClientID** and **ClientSecret**

This section describes how to generate them.

## Creating a Spotify App
1. **Navigate to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)**
2. **Click on "Create App" button.** The button to be clicked is surrounded by a red box.

    ![alt text](images/img_01.png)

    You will now see this:

    ![alt text](images/img_02.png)
3. **Fill the details.** We use a random name for "App Name" field, a random description. Here, I'm using the name "muf" for the "App Name" and the description "Some desc" for the description.

    You should now end up with this

    ![alt text](images/img_03.png)
4. **This is a very important step.**

    In the Redirect URI field, paste the following:
    ```
    https://178-79-138-81.ip.linodeusercontent.com/code
    ```

    ![alt text](images/img_04.png)

    You will finally end up with 

    ![alt text](images/img_05.png)
5. **Check "I understand and agree with Spotify's Developer Terms of Service and Design Guidelines," then click "Save".** Congratulations! You have now created your Spotify App.

## Connecting your Spotify App to muffon
1. In muffon, go the sidebar and click on "Settings"\
    ![alt text](images/img_06.png)
2. Click on "Connections", then on "Spotify" and finally on "Connect account"

    ![alt text](images/img_07.png)

    You will now see

    ![alt text](images/img_09.png)
3. Go to your spotify app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and navigate to settings.

    ![alt text](images/img_08.png)
4. Click on "View **ClientSecret**"
    ![alt text](images/img_010.png)
5. Copy both the ClientID and ClientSecret separately and paste them into the respective fields in muffon.
    You will now have
   
    ![alt text](images/img_11.png)
7. Now click on "Open link"
    
    You should see
   
    ![alt text](images/img_12.png)
8. Click on agree
    
    Now you should see
   
    ![alt text](images/img_13.png)
10. Copy the provided code and paste it into the input field in muffon.
    
    ![alt text](images/img_14.png)
11. Click on "Connect Account". Congratulations! You have connected your spotify account.

