Wizard step navigation service for AngularJS
============================================
* author: Marian Vasile, Nov 2013

Allows you to initialize a step-by-step wizard in your application, and provides bindings to manage step visibility and navigation.

Here's an short example for now (the includes are Symfony 2 twig tags):

```
<div class="container_12">
    <div class="row">
    <div class="grid_12">
        <div class="wizard" ng-cloak>

            <ul>
                <li><a href= " javascript:void(0); " ng-click= " wizard.goto('theme')     " ng-class = " { active_step: wizard.steps.theme }     " > Theme         </a> : </li>
                <li><a href= " javascript:void(0); " ng-click= " wizard.goto('demo')      " ng-class = " { active_step: wizard.steps.demo }      " > Demo          </a> : </li>
                <li><a href= " javascript:void(0); " ng-click= " wizard.goto('doc')       " ng-class = " { active_step: wizard.steps.doc }       " > Documentation </a> : </li>
                <li><a href= " javascript:void(0); " ng-click= " wizard.goto('community') " ng-class = " { active_step: wizard.steps.community } " > Community     </a> : </li>
            </ul>

            <hr />

            <div class="pager right">
                <button ng-click="wizard.back()" ng-disabled="!wizard.hasPrev()">Prev</button>
                <button ng-click="wizard.next()" ng-hide="!wizard.hasNext()">Next</button>
                <button ng-click="finish()" ng-show="!wizard.hasNext()">Done</button>
            </div>

            {% include "MyBundle:Wizard:theme_selection.html.twig" %} 
            {% include "MyBundle:Wizard:demo.html.twig"            %} 
            {% include "MyBundle:Wizard:doc.html.twig"             %} 
            {% include "MyBundle:Wizard:community.html.twig"       %} 

            <hr class="clear2" />
            <div class="pager right">
                <button ng-click="wizard.back()" ng-disabled="!wizard.hasPrev()">Prev</button>
                <button ng-click="wizard.next()" ng-hide="!wizard.hasNext()">Next</button>
                <button ng-click="finish()" ng-show="!wizard.hasNext()">Done</button>
            </div>
        </div>

    </div>
    </div>
</div>
```

```
<!-- theme_selection.html.twig -->
<div ng-show="wizard.steps.theme">
    <p class="info">Please select a theme</p>
</div>
```

```
<!-- demo.html.twig -->
<div ng-show="wizard.steps.demo">
    <p class="info">Please provide a demo URL</p>
</div>
```

```
<!-- doc.html.twig -->
<div ng-show="wizard.steps.doc">
    <p class="info">Please provide a documentation URL</p>
</div>
```

```
<!-- community.html.twig -->
<div ng-show="wizard.steps.community">
    <p class="info">Please provide a wiki (community) URL</p>
</div>
```
