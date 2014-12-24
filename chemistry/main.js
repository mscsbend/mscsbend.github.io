if(!NS3DS) {
  var NS3DS = {};
}

NS3DS.chemical = function(spec) {
  var that = {};
  var lines = spec.molString.split("\n").slice(3);
  var line = lines.shift();
  var i;
  that.numberOfAtoms = Number(line.substring(0, 3));
  that.numberOfBonds = Number(line.substring(3, 6));
  that.numberOfAtomLists = Number(line.substring(7, 10));
  that.isChiral = Boolean(Number(line.substring(16, 19)));
  that.numberOfTextEntries = Number(line.substring(21, 24));
  that.additionalPropertyLines = Number(line.substring(30, 33));
  that.version = line.substring(34, 39);
  that.atoms = [];
  var atom;
  if(that.numberOfAtoms) {
    i = 0;
    do {
      atom = {};
      line = lines.shift();
      atom.x = Number(line.substring(0, 10));
      atom.y = Number(line.substring(10, 20));
      atom.z = Number(line.substring(20, 30));
      atom.symbol = line.substring(31, 34).trim();
      atom.massDifference = Number(line.substring(34, 36));
      atom.charge = Number(line.substring(36, 39));
      atom.stereoParity = Number(line.substring(39, 42));
      atom.hydrogenCount = Number(line.substring(42, 45));
      atom.stereoCareBox = Boolean(Number(line.substring(45, 48)));
      atom.valence = Number(line.substring(48, 51));
      atom.designatorH0 = Number(line.substring(51, 54));
      atom.mapping = Number(line.substring(60, 63));
      atom.inversionRetention = Number(line.substring(63, 66));
      atom.exactChange = Number(line.substring(66, 69));
      that.atoms.push(atom);
      ++i;
    } while(i < that.numberOfAtoms);
  }
  that.bonds = [];
  var bond;
  if(that.numberOfBonds) {
    i = 0;
    do {
      bond = {};
      line = lines.shift();
      bond.first = Number(line.substring(0, 3));
      bond.second = Number(line.substring(3, 6));
      bond.type = Number(line.substring(6, 9));
      bond.stereo = Number(line.substring(9, 12));
      bond.topology = Number(line.substring(15, 18));
      bond.reactingCenterStatus = Number(line.substring(18, 21));
      that.bonds.push(bond);
      ++i;
    } while(i < that.numberOfBonds);
  }
  that.render = function(context) {
    var smallest = {};
    var biggest = {};
    var scale;
    var offset;
    that.atoms.forEach(function(atom, index, array) {
      if(!smallest.x || atom.x < smallest.x) {
        smallest.x = atom.x;
      }
      if(!smallest.y || atom.y < smallest.y) {
        smallest.y = atom.y;
      }
      if(!biggest.x || atom.x > biggest.x) {
        biggest.x = atom.x;
      }
      if(!biggest.y || atom.y > biggest.y) {
        biggest.y = atom.y;
      }
    });

    offset = {
      x: smallest.x,
      y: smallest.y
    };
    
    scale = {
      x: context.canvas.width / (biggest.x - smallest.x),
      y: context.canvas.height / (biggest.y - smallest.y)
    };
    
    scale.smallest = scale.x<scale.y?scale.x:scale.y;
    
    that.bonds.forEach(function(bond, index, array) {
      context.save();
      context.beginPath();
      context.moveTo((that.atoms[bond.first-1].x - offset.x) * scale.smallest, 
        (that.atoms[bond.first-1].y - offset.y) * scale.smallest);
      context.lineTo((that.atoms[bond.second-1].x - offset.x) * scale.smallest, 
        (that.atoms[bond.second-1].y - offset.y) * scale.smallest);
      context.stroke();
      context.restore();
    });
    
  };
  return that;
};

(function(){
  window.addEventListener("load", function() {
    var mols = document.querySelectorAll("mol");
    var i;
    var mol;
    var chemical;
    var json;
    var canvas;
    var context;
    for(i = 0; i<mols.length; ++i) {
      // Create the Chemical object
      mol = mols.item(i);
      chemical = NS3DS.chemical({molString: mol.innerHTML});
      // Create canvas rendering
      canvas = document.createElement("canvas");
      mol.parentNode.insertBefore(canvas, mol);
      context = canvas.getContext("2d");
      chemical.render(context);
      mol.style.display = "none";
      // Create JSON rendering
      json = JSON.stringify(chemical, null, "\t");
      console.log(json);
    }
  });
}());
