# Pitch To Contact

An extra-credit project I procrastinated for Stanford's CS109, Probability for Computer Scientists. Made in 11 hours. 

Notion I made documenting using Firebase and Google Cloud Run with React.js and Flask and Docker explaining deploying a full-stack application, based on this assignment:
https://legendary-bramble-8e5.notion.site/Deploying-a-Flask-Container-to-GC-Run-with-a-React-Frontend-on-Firebase-and-Docker-on-an-M1-Machine-8bb79bc0bcee4bebafa805a0e5c9c485?pvs=4

Utilizes the logistic regression machine learning algorithm on a bunch of pitcher related data. Takes into account pitcher arm slot (release position), with a bunch of other happy things found here: 
'release_speed', 'release_spin_rate', 'release_pos_x', 'release_pos_z', 
        'pfx_x', 'pfx_z', 'plate_x', 'plate_z', 'zone'

In order, it's pitch velocity, pitch spin rate, the x position of where the ball was released out of the pitchers hand from relative to the catcher's view with the middle of home plate being 0, the height of the ball relative to the catcher, how much right and left movement there is on each pitch from throw to catch, where it crosses the plate left/right and height, and what quadrant (1-9) of the strike zone it was. 

The project has hard-coded thetas at LR=.001 and S=1000. 

Some things that were coded up but were not able to be added to the final project were my usage of Naive Bayes to classify out or homerun based on the type of pitch thrown, but the Flask endpoint containing this should work properly if you wanted to call it manually in the terminal. Additionally, I linked all of this together with React amongst a CSV I put together myself using baseball savant. 

Check out the link to play around with it and see the cheeky little animation arm animation that nearly caused me to submit late!!

Check out the little write up here: https://docs.google.com/document/d/15V36_1oZefOL_Mwe3EO1pxD1ev5wvPnWhFu_6ySuRLY/edit?usp=sharing 
