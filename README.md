# TheMusicBox

- Description:
    TMB is a music application where you can find multiple music titles with their respective singer. This app will also suggest playlists for its users.

- Development:
    The back-end is developed using NodeJs
    The front-end is developed using Angular
    The media server use http-server
    
 - Run the project locally (each part independently) :
    - For the front : 
        - cd front
        - docker build -t front .
        - docker run -p 4200:4200 front
    - For the back : 
        - cd back
        - docker build -t back .
        - docker run -p 3000:3000 back
    - For the media-server :
        - cd media-server
        - docker build -t media .
        - docker run -p 4343:4343 media

- Run the project locally :
    - docker-compose build
    - docker-compose up -d
        
