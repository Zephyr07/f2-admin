import {Injectable, Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'status',
})

@Injectable()
export class StatutPipe implements PipeTransform{

  transform(value: any, ...args: any[]): any {
    if (value === 'solvent') {
      return 'Solvable';
    } else if (value === 'insolvent') {
      return 'Créance';
    } else if (value === 'pending_delivery') {
      return 'En attente de livraison';
    } else if (value === 'pending_confirmation') {
      return 'En attente de validation';
    } else if (value === 'delivered') {
      return 'Livré';
    } else if (value === 'collect') {
      return 'Collect';
    } else if (value === 'shop') {
      return 'Boutique';
    } else if (value === 'paid') {
      return 'Payée';
    } else if (value === 1) {
      return 'Oui';
    } else if (value === 0) {
      return 'Non';
    } else if (value === 'validated') {
      return 'Validé';
    } else if (value === 'pending') {
      return 'Non validé';
    } else if (value === 'enable' || value === 'actived') {
      return 'Activé';
    } else if (value === 'disable') {
      return 'Désactivé';
    } else if (value === 'female') {
      return 'Femme';
    } else if (value === 'male') {
      return 'Homme';
    }
  }
}
