NEPTUNE EXTENSION FOR NOTEBOOK
==============================

This extension can be build for both Jupyter Notebook (nbextension) and
Jupyter Lab (labextension) platform.


Develop nbextension
-------------------

Run `npm run start-nb` to build and put webpack in watch mode.

Then you have to options:

1.  Create a symlink to "./dist/nbextension/neptune-notebook.js" from something
    like this: "~/.local/share/jupyter/nbextensions/". Run `npm run build-nb`.
    Running `npm run install-nb` will create the filename and enable
    the extension.
2.  Edit the "../../setup.py" file and use python installer for hot-reload.
    `pip -e . && jupyter nbextension enable --py --sys-prefix neptune-notebook`.

The second way has only been tried by backend developers, sorry!

Hint: The nbextension is an AMD module.


Develop labextension
--------------------

1.  `npm run start-lab` to build and put webpack in watch mode.
2.  `jupyter labextension link .` (this is both install and watch command).
3.  `jupyter lab --watch` to start jupyter in watch mode.

Hint: The labextension is a standard npm package. Jupyter tools run "npm pack"
by themselves during install.