
export function getMonthString(month: number): string {
    let monthString: string;

    switch (month) {
      case 1:
        monthString = 'JAN';
        break;
      case 2:
        monthString = 'FEB';
        break;
      case 3:
        monthString = 'MAR';
        break;
      case 4:
        monthString = 'APRIL';
        break;
      case 5:
        monthString = 'MAY';
        break;
      case 6:
        monthString = 'JUNE';
        break;
      case 7:
        monthString = 'JULY';
        break;
      case 8:
        monthString = 'AUG';
        break;
      case 9:
        monthString = 'SEPT';
        break;
      case 10:
        monthString = 'OCT';
        break;
      case 11:
        monthString = 'NOV';
        break;
      case 12:
        monthString = 'DEC';
        break;
      default:
        monthString = 'Invalid month'; // Handle invalid input
    }

    return monthString;
  }

