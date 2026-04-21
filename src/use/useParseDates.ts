
export function getMonthString(month: number): string {
    let monthString: string;

    switch (month) {
      case 0:
        monthString = 'JAN';
        break;
      case 1:
        monthString = 'FEB';
        break;
      case 2:
        monthString = 'MAR';
        break;
      case 3:
        monthString = 'APRIL';
        break;
      case 4:
        monthString = 'MAY';
        break;
      case 5:
        monthString = 'JUNE';
        break;
      case 6:
        monthString = 'JULY';
        break;
      case 7:
        monthString = 'AUG';
        break;
      case 8:
        monthString = 'SEPT';
        break;
      case 9:
        monthString = 'OCT';
        break;
      case 10:
        monthString = 'NOV';
        break;
      case 11:
        monthString = 'DEC';
        break;
      default:
        monthString = 'Invalid month'; // Handle invalid input
    }

    return monthString;
  }

