module.exports = {
  /**
   * This is the 'up' migration function that remove documents from the 'Sponsor' collection which have no borrowers .
   * The migration involves finding sponsors without borrowers, updating associated deals, and removing those sponsors.
   */
  async up(db) {
    const Sponsor = await db.collection('Sponsor');
    const Deal = await db.collection('Deal');
    const User = await db.collection('User');

    // Find users who have a 'sponsor' field .
    const usersAddedAsBorrower = await User.find({
      sponsor: {
        $exists: true
      }
    }).toArray();
    // Extract sponsor IDs from users who have borrowers.
    const sponsorIdsHavingBorrowers = usersAddedAsBorrower.map(user => user.sponsor);

    // Find sponsors which _id not included in sponsorIdsHavingBorrowers
    const SponsorHavingNotBorrowers = await Sponsor.find({
      _id: {
        $nin: sponsorIdsHavingBorrowers
      }
    }).toArray();
    // Extract the IDs of sponsors with no borrowers.
    const SponsorIdsHavingNotBorrowers = SponsorHavingNotBorrowers.map(sponsor => sponsor._id);

    // Update deals that have sponsors with no borrowers by removing the 'sponsor' field.
    const dealsHavingSponsorWithNoBorrower = await Deal.updateMany({
      sponsor: {
        $in: SponsorIdsHavingNotBorrowers
      }
    }, {
      $unset: {
        sponsor: 1
      }
    });

    // Delete sponsors that have no borrowers.
    const deletedSponsor = await Sponsor.deleteMany({
      _id: {
        $in: SponsorIdsHavingNotBorrowers
      }
    });
    console.log(`Number of deals updated : ${dealsHavingSponsorWithNoBorrower.acknowledged ? dealsHavingSponsorWithNoBorrower.modifiedCount : 0} & Number of sponsors removed : ${deletedSponsor.acknowledged ? deletedSponsor.deletedCount : 0}`);
  },
  async down() {
    console.log("There's error in up so down is called");
  }
};