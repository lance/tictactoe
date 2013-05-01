tictactoe
=========

Simple tictactoe game implemented in Javascript using DynJS runtime. To play, first clone the repository, then
install dynjs with the provided installation script.

    $ git clone git://github.com/lance/tictactoe.git
    Cloning into 'tictactoe'...
    remote: Counting objects: 35, done.
    remote: Compressing objects: 100% (26/26), done.
    remote: Total 35 (delta 9), reused 26 (delta 3)
    Receiving objects: 100% (35/35), 7.03 KiB, done.
    Resolving deltas: 100% (9/9), done.
    $ cd tictactoe
    $ ./install-dynjs.sh
    Archive:  dynjs.zip
      creating: bin/
      inflating: bin/dynjs               
    DynJS is installed. Play tictactoe with `./bin/dynjs tictactoe.js`


Then play!

    $ ./bin/dynjs tictactoe.js

Enjoy

*NB:* The dynjs binary currently has issues running in a Linux environment, or any system with Gnu's `/usr/bin/env`.
To play tictactoe on a Linux system, use the command `$ java -jar ./bin/dynjs tictactoe.js`.
