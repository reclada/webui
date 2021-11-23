

### These set of manifests of example of Issue for generating TLS certificates via LetsEncrypt provider

```
kubectl apply -f example_cluster-issuer-prod.yaml 
 
kubectl apply -f example_certificates.yaml --validate=false

kubectl apply -f example_ingress.yaml

kubectl get clusterissuers -n keycloak

kubectl get certificate
```

[Original_article](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes-ru)