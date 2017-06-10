import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GithubservicesProvider } from '../../providers/githubservices/githubservices';
import { RepoDetailsPage} from '../repo-details/repo-details';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';
  profiles: any;
  repos: any;
  github_user = "";

  constructor(private navCtrl: NavController, private auth: AuthServiceProvider, private githubService: GithubservicesProvider) {
    let info = this.auth.getUserInfo();
    this.username = info['name'];
    this.email = info['email'];
  }
  onSubmit() {
    this.getProfile(this.github_user);
    this.github_user = '';
  }

  reset() {
    this.profiles = ''
    this.github_user = '';
}

showRepos(github_user){
this.getRepos(github_user);
}

repoTapped(event, repo) {
  this.navCtrl.push(RepoDetailsPage, {
    repo: repo
  });
}

  getProfile(username) {
    this.githubService.getProfile(username).subscribe(response => {
      this.profiles = response;
      console.log(this.profiles);
    })
  }

  getRepos(username) {
    this.githubService.getRepos(username).subscribe(response => {
      this.repos = response;
      console.log(this.repos);
    })
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot('LoginPage')
    });
  }
}
