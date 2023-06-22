(function(Scratch) {
    'use strict';
  
    if (!Scratch.extensions.unsandboxed) {
      throw new Error('This Turbo Mode example must run unsandboxed');
    }
    const vm = Scratch.vm;
  
    class ScratchFR {
      getInfo() {
        return {
          id: 'scratchfrunsandboxed',
          name: 'Scratch FR',
          blocks: [
            {
              opcode: 'SizeOfCostume',
              blockType: Scratch.BlockType.REPORTER,
              text: '[SizeMenu] of [SpriteMenu]',
              arguments: {
                SizeMenu: {
                  type: Scratch.ArgumentType.STRING,
                  menu: 'Size_Menu'
                },
                SpriteMenu: {
                    type: Scratch.ArgumentType.STRING,
                    menu: 'Sprite_Menu'
                }
              }
            }
          ],
          menus: {
            Size_Menu: {
              acceptReporters: true,
              items: ['width', 'height']
            },
            Sprite_Menu: {
                acceptReporters: true,
                items: getSprites
            }
          }
        };
      }

      getSprites() {
        const spriteNames = []; // Crée un tableau vide pour stocker les noms des sprites
      
        const targets = Scratch.vm.runtime.targets; // Récupère la liste des sprites (targets) dans la Scratch VM
      
        const myself = Scratch.vm.runtime.getEditingTarget().getName(); // Obtient le nom du sprite actuellement édité
      
        // Parcourt chaque sprite (à partir de l'index 1 pour ignorer le stage)
        for (let index = 1; index < targets.length; index++) {
          const target = targets[index]; // Récupère le sprite à l'index courant
      
          if (target.isOriginal) { // Vérifie si le sprite est l'original (et non un clone)
            const targetName = target.getName(); // Obtient le nom du sprite
      
            if (targetName === myself) {
              // Si le sprite est le sprite actuellement édité, l'ajoute en haut de la liste avec le texte 'this sprite'
              spriteNames.unshift({
                text: 'this sprite',
                value: targetName
              });
            } else {
              // Si le sprite n'est pas le sprite actuellement édité, l'ajoute à la fin de la liste avec son nom
              spriteNames.push({
                text: targetName,
                value: targetName
              });
            }
          }
        }
      
        if (spriteNames.length > 0) {
          return spriteNames; // Retourne la liste des options de sprites
        } else {
          return [{text: "", value: 0}]; // Cela ne devrait jamais se produire, mais c'est une mesure de sécurité en cas de liste vide
        }
      }
      

      set(args) {
        vm.setTurboMode(args.ENABLED === 'on');
      }
    }
    Scratch.extensions.register(new ScratchFR());
  })(Scratch);
